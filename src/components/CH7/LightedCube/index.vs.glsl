attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec4 a_Normal;
uniform mat4 u_MvpMatrix;
uniform vec3 u_LightDirection;
uniform vec3 u_LightColor;
uniform vec3 u_AmbientColor;
varying vec4 v_Color;
void main(){
  gl_Position = u_MvpMatrix * a_Position;
  vec3 normal = normalize(a_Normal.xyz);
  float costheta = max(dot(u_LightDirection, normal), 0.0);
  vec3 diffuse = u_LightColor * a_Color.rgb * costheta;
  vec3 ambient = u_AmbientColor * a_Color.rgb;
  v_Color = vec4(diffuse + ambient, a_Color.a);
}