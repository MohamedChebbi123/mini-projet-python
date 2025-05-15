# Student Management App Performance Testing

This directory contains Locust-based performance tests for the Student Management API.

## Prerequisites

- Python 3.6+
- A running instance of the Student Management API (should be running on `http://127.0.0.1:8000`)

## Installation

Make sure you have Locust installed:

```bash
pip install locust
```

## Available Test Files

1. `locustfile.py` - Basic load testing without detailed validation
2. `advanced_locustfile.py` - Advanced load testing with response validation

## Running the Tests

### Basic Load Test

You can run the basic load test using the following command:

```bash
python run_performance_test.py
```

This will:
- Run a test with 10 simulated users
- Spawn them at a rate of 1 user per second
- Run for 30 seconds
- Generate an HTML report in the `performance_reports` directory

### Advanced Load Test

The advanced load test includes response validation and more comprehensive test scenarios:

```bash
python run_advanced_test.py --users 20 --spawn-rate 2 --duration 1m
```

Parameters:
- `--users`: Number of concurrent users (default: 10)
- `--spawn-rate`: Rate at which users are spawned in users per second (default: 1)
- `--duration`: Test duration (default: 30s, format examples: "30s", "1m", "2h")
- `--with-ui`: Run with the Locust web UI instead of headless mode

### Running Locust Directly

You can also run Locust directly with its web interface:

```bash
locust -f advanced_locustfile.py --host=http://127.0.0.1:8000
```

Then open a browser and navigate to http://localhost:8089/ to start and monitor the test.

## Test Reports

Reports are saved in the `performance_reports` directory with timestamps. Each report includes:

- Request statistics (requests per second, response times, failure rates)
- Charts showing response times and request rates over time
- Failures (if any)

## Adding New Test Scenarios

To add new test scenarios:
1. Edit the `advanced_locustfile.py` file
2. Add new tasks annotated with the `@task` decorator
3. Implement the test logic, including response validation

Example:

```python
@task(2)
def my_new_test_scenario(self):
    """Description of what this test does"""
    with self.client.get("/my_new_endpoint", catch_response=True) as response:
        is_valid, error = self.validator.validate_response(
            response, 
            expected_fields=["field1", "field2"]
        )
        if is_valid:
            response.success()
        else:
            response.failure(error)
```

## Performance Testing Best Practices

1. **Start Small**: Begin with a small number of users and gradually increase
2. **Monitor Server**: Keep an eye on server metrics during tests
3. **Focus on Critical Paths**: Prioritize testing the most important user flows
4. **Realistic Data**: Use realistic test data that mimics production
5. **Regular Testing**: Run performance tests regularly, not just before releases
