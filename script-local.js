import http from "k6/http";
import { sleep, check } from "k6";
export const options = {
  // vus: 2,
  // duration: "1s",
  // stages: [
  //   {
  //     duration: "50s",
  //     target: 5,
  //   },
  //   {
  //     duration: "1m",
  //     target: 500,
  //   },
  //   {
  //     duration: "1m",
  //     target: 1000,
  //   },
  //   {
  //     duration: "10s",
  //     target: 0,
  //   },
  // ],
  // thresholds: {
  //   http_req_failed: ["rate<0.01"], // http errors should be less than 1%
  //   http_req_duration: ["avg<10"], // 95% of requests should be below 200ms
  // },
};
const baseUrl = "http://127.0.0.1:3000";
export default function () {
  const res = create();
  check(res, { success: (r) => r.status == 201 });
  // const res = list();
  // check(res, { success: (r) => r.status == 201 });
  sleep(1);
}

function create() {
  const userBody = {
    firstName: "Henry",
    lastName: "Hak",
    age: 20,
  };

  return request("post", `${baseUrl}/user`, userBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function list() {
  return request(
    "get",
    `${baseUrl}/user`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

function request(method, url, body, params) {
  const payload = JSON.stringify(body);
  const req = () => {
    switch (method) {
      case "get":
        return http.get(url, payload, params);
      case "post":
        return http.post(url, payload, params);
      case "put":
        return http.put(url, payload, params);
      case "delete":
        return http.del(url, payload, params);
      default:
        throw new Error("Invalid Method");
    }
  };

  const res = req();

  return res;
}
