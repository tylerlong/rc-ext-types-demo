const RingCentral = require("@rc-ex/core").default;
const WSExt = require("@rc-ex/ws").default;

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rc.authorize({
    jwt: process.env.RINGCENTRAL_JWT_TOKEN,
  });
  const ws = new WSExt({
    restOverWebSocket: true,
    debugMode: true,
  });
  await rc.installExtension(ws);
  const r = await rc.restapi().account().extension().get();
  console.log(JSON.stringify(r, null, 2));
  await rc.revoke();
};
main();
