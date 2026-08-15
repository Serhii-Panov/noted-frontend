import { fetchNotes } from "../clientApi";
import { AxiosResponse } from "axios";
import nextProxyServer from "../api";

jest.mock("../api", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("fetchNotes API client", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Очищаем историю моков перед каждым тестом
  });

  it("sends correct query params for status, priority, and sorting", async () => {
    const mockGet = jest.mocked(nextProxyServer.get);

    mockGet.mockResolvedValueOnce({
      data: { notes: [], totalPages: 1 },
    } as AxiosResponse);

    await fetchNotes({
      page: 1,
      perPage: 10,
      status: "undone",
      priority: 5,
      sortBy: "priority_desc",
    });

    expect(mockGet).toHaveBeenCalledWith("/notes", {
      params: {
        page: 1,
        perPage: 10,
        status: "undone",
        priority: 5,
        sortBy: "priority_desc",
        search: undefined,
        tag: undefined,
      },
      headers: undefined,
    });
  });

  it("sends tag parameter correctly", async () => {
    const mockGet = jest.mocked(nextProxyServer.get);

    mockGet.mockResolvedValueOnce({
      data: { notes: [], totalPages: 1 },
    } as AxiosResponse);

    await fetchNotes({
      page: 1,
      perPage: 10,
      tag: "Work",
    });

    expect(mockGet).toHaveBeenCalledWith("/notes", {
      params: {
        page: 1,
        perPage: 10,
        tag: "Work",
        search: undefined,
        status: undefined,
        priority: undefined,
        sortBy: undefined,
      },
      headers: undefined,
    });
  });

  it("throws an error when server returns 500", async () => {
    const mockGet = jest.mocked(nextProxyServer.get);
    // Мокаем отклонение промиса (rejected)
    mockGet.mockRejectedValueOnce(new Error("Server Error"));

    await expect(fetchNotes({ page: 1, perPage: 10 })).rejects.toThrow(
      "Failed to fetch notes",
    );
  });
});
