import http from 'k6/http';
import { sleep, check } from 'k6';

// Configuration
export let options = {
    stages: [
        { duration: '10s', target: 50 }, // Ramp-up to 50 VUs over 1 minute
        { duration: '20s', target: 50 }, // Stay at 50 VUs for 3 minutes
        { duration: '10s', target: 0 }, // Ramp-down to 0 VUs over 1 minute
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // Define custom performance thresholds
        http_req_failed: ['rate<0.1'], // Define the acceptable error rate
    },
};

// Main test function
export default function () {
    // HTTP request example - change the URL and other parameters as needed
    let response = http.get('link of the website');

    // Check response status and validate content if needed
    check(response, {
        'is status 200': (r) => r.status === 200,
        // Add more checks as per your application's expected behavior
    });

    // Sleep to simulate user think time (optional)
    sleep(1);
}



//k6 run --vus 10 --duration 10s src/load_test.js