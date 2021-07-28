precision mediump float;
void main(){
  gl_FragColor=vec4(gl_FragCoord.x / 200.0,gl_FragCoord.y/ 200.0 ,0.5  ,1.0 );
}