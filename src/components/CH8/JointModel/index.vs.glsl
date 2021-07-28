uniform mat4 u_MvpMatrix;
uniform mat4 u_NormalMatrix;
attribute vec4 a_Normal;
attribute vec4 a_Position;
attribute vec4 a_Color;

varying vec3 v_Normal;
varying vec3 v_Position;
void main(){
  // gl_Position =  a_Position;
  gl_Position = u_MvpMatrix * a_Position;
  v_Position = vec3(u_MvpMatrix * a_Position);
  v_Normal = vec3(u_NormalMatrix * a_Normal);
}