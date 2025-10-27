import { Client, Databases, ID, Query, Permission, Role } from "appwrite";
import config from "@/Config/config";

export class WatchlistService {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(config.appwriteEndpoint).setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async addToWatchlist({ userId, coinId, name, symbol, iconUrl }) {
    return await this.databases.createDocument(
      config.appwriteDatabaseId,
      config.appwriteCollection1Id,
      ID.unique(),
      { userId, coinId, name, symbol, iconUrl },
      [Permission.read(Role.user(userId)), Permission.write(Role.user(userId))]
    );
  }

  async getWatchlist(userId) {
    const res = await this.databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollection1Id,
      [Query.equal("userId", userId)]
    );
    return res.documents;
  }

  async removeFromWatchlist(documentId) {
    return await this.databases.deleteDocument(
      config.appwriteDatabaseId,
      config.appwriteCollection1Id,
      documentId
    );
  }
}

const watchlistService = new WatchlistService();
export default watchlistService;