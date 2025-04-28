const BASE_URL = "https://store.steampowered.com/api";

const steamService = {
  getPopularGames: async (page = 1) => {
    const url = `${BASE_URL}/store/search/results/?filter=topsellers&hidef2p=1&page=${page}&json=1`;
    const proxyUrl = `/api/steam?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch popular games");
    }
    return response.json();
  },

  getGameDetails: async (appid) => {
    const url = `${BASE_URL}/appdetails?appids=${appid}&cc=pl&l=polish`;
    const proxyUrl = `/api/steam?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch game details");
    }
    const data = await response.json();
    return data[appid].data;
  },

  searchGames: async (query, page = 1) => {
    const url = `${BASE_URL}/store/search/results/?term=${encodeURIComponent(
      query
    )}&page=${page}&json=1`;
    const proxyUrl = `/api/steam?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error("Failed to search games");
    }
    return response.json();
  },
};

export default steamService;
