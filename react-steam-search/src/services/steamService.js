import axios from "axios";

class SteamService {
  constructor() {
    this.baseUrl = "/store/search/results/";
    this.appDetailsUrl = "/store/api/appdetails";
    this.params = {
      filter: "topsellers",
      hidef2p: 1,
      page: 1,
      json: 1,
    };
  }

  async getGames() {
    try {
      const response = await axios.get(this.baseUrl, { params: this.params });

      if (response.status !== 200) {
        console.error(`Failed to get search results: ${response.status}`);
        return null;
      }

      const data = response.data;
      const games = [];

      for (const item of data.items) {
        try {
          // Extract appid from logo URL
          const logoUrl = item.logo;
          const appidMatch = logoUrl.match(/steam\/\w+\/(\d+)/);
          if (!appidMatch) {
            console.warn(`Warning: Could not extract appid from ${logoUrl}`);
            continue;
          }
          const appid = appidMatch[1];

          const game = {
            name: item.name,
            appid: appid,
            price: await this._getPrice(appid),
          };
          games.push(game);
        } catch (error) {
          console.warn(`Warning: Missing logo data:`, error);
          continue;
        }
      }

      return games.slice(0, 10);
    } catch (error) {
      console.error("Error fetching games:", error);
      return null;
    }
  }

  async _getPrice(appid) {
    try {
      const params = {
        appids: appid,
        cc: "pl",
        l: "polish",
      };

      const response = await axios.get(this.appDetailsUrl, { params });

      if (response.status !== 200) {
        console.error(
          `Failed to get price for app ${appid}: ${response.status}`
        );
        return "Cena niedostępna";
      }

      const data = response.data;
      if (!data[appid] || !data[appid].success) {
        return "Cena niedostępna";
      }

      const priceData = data[appid].data;
      if (!priceData) {
        return "Cena niedostępna";
      }

      if (priceData.is_free) {
        return "Darmowa";
      }

      const price = priceData.price_overview;
      if (price) {
        return `${price.final / 100}zł`;
      }

      return "Cena niedostępna";
    } catch (error) {
      console.error(`Error getting price for app ${appid}:`, error);
      return "Cena niedostępna";
    }
  }

  async getPopularGames() {
    return this.getGames();
  }

  async getGameDetails(appid) {
    try {
      const params = {
        appids: appid,
        cc: "pl",
        l: "polish",
      };

      const response = await axios.get(this.appDetailsUrl, { params });

      if (response.status !== 200) {
        throw new Error(`Failed to get game details: ${response.status}`);
      }

      const data = response.data[appid];
      if (!data || !data.success) {
        return null;
      }

      const gameData = data.data;
      if (!gameData) {
        return null;
      }

      return {
        name: gameData.name || "TYTUŁ",
        appid: appid,
        description: gameData.short_description || "OPIS",
        requirements:
          gameData.pc_requirements || "WYMAGANIA SPRZĘTOWE NIEDOSTĘPNE",
        price: await this._getPrice(appid),
        publisher: gameData.publishers?.[0] || "WYDAWCA",
        header_image: gameData.header_image || "",
        screenshots: gameData.screenshots?.map((s) => s.path_thumbnail) || [],
        release_date: gameData.release_date?.date || "Data wydania niedostępna",
        genres: gameData.genres?.map((g) => g.description) || [],
        categories: gameData.categories?.map((c) => c.description) || [],
      };
    } catch (error) {
      console.error(`Error getting game details for app ${appid}:`, error);
      return null;
    }
  }

  async searchGames(query) {
    try {
      const params = {
        ...this.params,
        term: query,
      };

      const response = await axios.get(this.baseUrl, { params });

      if (response.status !== 200) {
        throw new Error(`Failed to search games: ${response.status}`);
      }

      const data = response.data;
      const games = [];

      for (const item of data.items.slice(0, 10)) {
        try {
          const logoUrl = item.logo;
          const appidMatch = logoUrl.match(/steam\/\w+\/(\d+)/);
          if (!appidMatch) continue;

          const appid = appidMatch[1];
          const details = await this.getGameDetails(appid);
          if (details) {
            games.push(details);
          }
        } catch (error) {
          console.warn(`Error processing game:`, error);
          continue;
        }
      }

      return games;
    } catch (error) {
      console.error("Error searching games:", error);
      throw new Error("Failed to search games");
    }
  }
}

export default new SteamService();
