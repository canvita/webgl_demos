precision mediump float;
uniform vec3 u_LightColor;
uniform vec3 u_LightPosition;
uniform vec3 u_AmbientColor;

varying vec3 v_Normal;
varying vec3 v_Position;
void main(){
  vec4 color = vec4(1.0, 0.4, 0.0, 1.0);
  vec3 lightDirection = normalize(u_LightPosition - v_Position);
  float nDotl = max(dot(lightDirection, v_Normal), 0.0); 
  vec3 diffuse = color.rgb * u_LightColor * nDotl;
  vec3 ambient = u_AmbientColor * color.rgb;
  gl_FragColor = vec4(diffuse + ambient, color.a);
  // gl_FragColor = vec4(1.0, 0.0,0.0, 1.0);
}