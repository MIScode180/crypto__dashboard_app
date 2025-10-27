import config from "../Config/config.js";
import { Client, Account, ID } from "appwrite";

export class AppwriteService {
  client;
  account;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    await this.account.create(ID.unique(), email, password, name);
    return this.login({ email, password });
  }

  async login({ email, password }) {
    try {
      await this.account.deleteSession("current");
    } catch (err) {
      if (err.code !== 401) throw err;
    }
    return this.account.createEmailPasswordSession(email, password);
  }

  async getCurrentUser() {
    try {
      return await this.account.get(); // includes prefs.avatar
    } catch {
      return null;
    }
  }

  async updateName(name) {
    return await this.account.updateName(name);
  }

  async updateUserPrefs(prefs) {
    return await this.account.updatePrefs(prefs);
  }

  async logout() {
    return await this.account.deleteSessions();
  }
}

const authService = new AppwriteService();
export default authService;
