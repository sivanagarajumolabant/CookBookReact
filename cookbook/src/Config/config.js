const API_BASE_URL = ()=>  "http://localhost:8000/api";
const ACCESS_TOKEN =()=> localStorage.getItem('quadranttoken');
 export default {API_BASE_URL, ACCESS_TOKEN}