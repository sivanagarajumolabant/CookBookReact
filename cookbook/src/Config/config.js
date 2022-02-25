const API_BASE_URL = ()=>  "http://20.47.89.104:81";
// const API_BASE_URL = ()=>  "http://3.140.247.61";
const ACCESS_TOKEN =()=> localStorage.getItem('quadranttoken');
 export default {API_BASE_URL, ACCESS_TOKEN}