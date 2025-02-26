import { mockApiService } from "./MockTransactionApi";

describe("Mock API Service", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return mock transactions after delay", async () => {
    const promise = mockApiService.getTransactions();
    jest.advanceTimersByTime(500);
    const result = await promise;
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("amount");
    expect(result[0]).toHaveProperty("transactionId");
    expect(result[0]).toHaveProperty("transactionType");
    expect(result[0]).toHaveProperty("transactionDate");
    expect(result[0]).toHaveProperty("time");
    expect(result[0]).toHaveProperty("status");
  });

  it("should resolve after 500ms", async () => {
    const promise = mockApiService.getTransactions();
    jest.advanceTimersByTime(500);
    await promise;
    expect(promise).resolves.toBeDefined();
  });
});
