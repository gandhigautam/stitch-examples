export default class BaaSService {
  static async create({ BaasClient, MongoClient, loadLocalStorage }) {
    await loadLocalStorage();
    const baasClient = new BaasClient('OSSChat');
    const mongoClient = new MongoClient(baasClient, 'mdb1');

    const instance = new BaaSService();
    instance.baasClient = baasClient;
    instance.mongoClient = mongoClient;

    instance.createViewer();

    return instance;
  }

  createViewer() {
    this.viewer = this.baasClient.auth();
    if (!this.viewer) {
      this.baasClient.authManager.anonymousAuth(true);
    }
    this.viewer = this.baasClient.auth();
  }

  getDb() {
    return this.mongoClient.getDb('osschat');
  }
}