var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

function sortByKey( array, key ) {
  return array.sort( function( a, b ) {
    var x = a[ key ];
    var y = b[ key ];
    return ( ( x < y ) ? -1 : ( ( x > y ) ? 1 : 0 ) );
  } );
}

var loader = new THREE.ObjectLoader();
loader.load( 'public/resources/figure.json', function( object ) {
  var pointSize = 3;
  var endSize = 1;
  var collidableMeshList = [];
  collidableMeshList.push( object );
  var texture = new THREE.TextureLoader().load( 'public/resources/particle.png' );
  var material = new THREE.PointsMaterial( { size: pointSize, sizeAttenuation: false, map: texture, transparent: true, alphaTest: 0.5 } );
  var bodyPoints = THREE.GeometryUtils.randomPointsInGeometry( object.children[ 0 ].geometry, 10000 );
  var bodyGeometry = new THREE.Geometry();
  var cloudGeometry = new THREE.Geometry();

  var randomPoints = 10000;

  for ( var i = 0; i < randomPoints; i++ ) {
    var x = Math.random() * 50 - 25;
    var y = bodyPoints[ i ].y;
    var z = Math.random() * 50 - 25;
    cloudGeometry.vertices.push( new THREE.Vector3( x, y, z ) );
  }
  cloud = new THREE.Points( cloudGeometry, material );
  cloud.translateY( -3 );
  cloud.scale.set( 0.35, 0.35, 0.35 );
  cloud.rotateX( Math.PI / -2 );
  scene.add( cloud );

  for ( var j in bodyPoints ) {
    bodyGeometry.vertices.push( bodyPoints[ j ] );
  }
  body = new THREE.Points( bodyGeometry, material );
  body.translateY( -3 );
  body.scale.set( 0.35, 0.35, 0.35 );
  body.rotateX( Math.PI / -2 );

  var cloudToBody = [];
  var moveTime = 150;
  var sizeDiff = ( pointSize - endSize ) / moveTime;
  for ( var h in cloudGeometry.vertices ) {
    var x = ( cloudGeometry.vertices[ h ].x - bodyGeometry.vertices[ h ].x ) / moveTime;
    var y = 0;
    var z = ( cloudGeometry.vertices[ h ].z - bodyGeometry.vertices[ h ].z ) / moveTime;
    cloudToBody.push( new THREE.Vector3( x, y, z ) );
  }

  var threshold = []
  var maxZ = {}
  var minZ = {}
  var verts = body.geometry.vertices
  var xFocus = 100
  var yFocus = 10
  for ( x in verts ) {
    threshold.push( [ 0, Math.random() * 0.005 - 0.001 ] )
    var floorX = Math.floor( verts[ x ].x * xFocus ) / xFocus
    var floorY = Math.floor( verts[ x ].y * yFocus ) / yFocus
      // verts[ x ].x = floorX
      // verts[ x ].y = floorY
    if ( !( floorX in maxZ ) ) {
      maxZ[ floorX ] = {}
    }
    if ( !( floorX in minZ ) ) {
      minZ[ floorX ] = {}
    }
    if ( !( floorY in maxZ[ floorX ] ) || maxZ[ floorX ][ floorY ] < verts[ x ].z ) {
      maxZ[ floorX ][ floorY ] = verts[ x ].z
    }
    if ( !( floorY in minZ[ floorX ] ) || minZ[ floorX ][ floorY ] > verts[ x ].z ) {
      minZ[ floorX ][ floorY ] = verts[ x ].z
    }
  }

  var maxMove = 2
  var cloudFocus = 10000;
  var animX = false;
  var animZ = false;
  var render = function() {
    requestAnimationFrame( render );
    if ( !animX || !animZ ) {
      for ( i in cloud.geometry.vertices ) {
        if ( Math.floor( cloud.geometry.vertices[ i ].x * cloudFocus ) / cloudFocus !=
          Math.floor( body.geometry.vertices[ i ].x * cloudFocus ) / cloudFocus ) {
          cloud.geometry.vertices[ i ].x -= cloudToBody[ i ].x;
        } else {
          animX = true;
        }
        if ( Math.floor( cloud.geometry.vertices[ i ].z * cloudFocus ) / cloudFocus !=
          Math.floor( body.geometry.vertices[ i ].z * cloudFocus ) / cloudFocus ) {
          cloud.geometry.vertices[ i ].z -= cloudToBody[ i ].z;
        } else {
          animZ = true;
        }
      }
      cloud.geometry.verticesNeedUpdate = true;
      if ( cloud.material.size > endSize ) {
        cloud.material.size -= sizeDiff;
      }
    } else {
      scene.remove( cloud )
      scene.add( body )
      body.rotation.z += 0.01

      // for ( x in body.geometry.vertices ) {
      //   var localVertex = body.geometry.vertices[ x ].clone();
      //   var globalVertex = localVertex.applyMatrix4( body.matrix );
      //   var directionVector = globalVertex.sub( body.geometry.vertices[ x ] );
      //
      //   var ray = new THREE.Raycaster( body.geometry.vertices[ x ], directionVector.clone().normalize() );
      //   var collisionResults = ray.intersectObjects( collidableMeshList );
      //   if ( collisionResults.length > 0 && collisionResults[ 0 ].distance < directionVector.length() ) {
      //     console.log( "hi" );
      //   }
      // }
    }

    renderer.render( scene, camera );
  }
  render();
} );