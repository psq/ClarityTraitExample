import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";

describe("dispatcher contract test suite", () => {
  let dispatcherClient: Client;
  let targetClient: Client;
  let traitClient: Client;

  let provider: Provider;

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    dispatcherClient = new Client("SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.dispatcher", "dispatcher", provider);
    targetClient = new Client("SP2NC4YKZWM2YMCJV851VF278H9J50ZSNM33P3JM1.target", "target", provider);
    traitClient = new Client("S1G2081040G2081040G2081040G208105NK8PE5.define-trait", "define-trait", provider);
  });

  it("should have a valid syntax", async () => {
    await traitClient.deployContract();
    await targetClient.deployContract();
    await dispatcherClient.deployContract();

    await traitClient.checkContract();
    await dispatcherClient.checkContract();
    await targetClient.checkContract();
  });

  describe("deploying an instance of the contract", () => {
    before(async () => {
    });

    it("should return 'dispatcher'", async () => {
      const query = dispatcherClient.createQuery({ method: { name: "wrapped-get-1", args: [ "'SP2NC4YKZWM2YMCJV851VF278H9J50ZSNM33P3JM1.target"] } });
      const receipt = await dispatcherClient.submitQuery(query);
      const result = Result.unwrapString(receipt);
      assert.equal(result, "dispatcher");
    });

  });

  after(async () => {
    await provider.close();
  });
});
