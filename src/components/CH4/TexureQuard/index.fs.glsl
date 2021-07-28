#ifdef GL_ES
precision mediump float;
#endif
precision mediump float;
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
void main(){
  gl_FragColor = texture2D(u_Sampler, v_TexCoord);
  // gl_FragColor = vec4(gl_FragCoord.x / 200.0,gl_FragCoord.y/ 200.0 ,0.5  ,1.0 );
}