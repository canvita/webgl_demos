
precision mediump float;
uniform vec3 u_LightPosition;
uniform vec3 u_LightColor;
uniform vec3 u_AmbientColor;
varying vec3 v_Position;
varying vec3 v_Normal;
varying vec4 v_Color;

void main(){
  vec3 lightDirection = normalize(u_LightPosition - v_Position);
  float costheta = max(dot(lightDirection, normalize(v_Normal)), 0.0);
  vec3 diffuse = vec3(v_Color) * u_LightColor * costheta;
  vec3 ambient = vec3(v_Color) * u_AmbientColor;
  gl_FragColor = vec4(diffuse + ambient, v_Color.a); 
}