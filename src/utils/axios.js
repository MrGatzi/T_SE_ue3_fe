import axios from "axios";

const instance = axios.create({
    baseURL: "http://awsseue5-env.eba-ijmmfhg3.eu-central-1.elasticbeanstalk.com",
});

export default instance;
