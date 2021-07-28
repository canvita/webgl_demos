#ifdef GL_ES
precision mediump float;
#endif
precision mediump float;
uniform sampler2D u_Sampler;
uniform sampler2D u_Sampler2;
varying vec2 v_TexCoord;
void main(){
   vec4 color = texture2D(u_Sampler, v_TexCoord);
   vec4 color2 = texture2D(u_Sampler2, v_TexCoord);
  gl_FragColor = color * color2;
}