const sdk = require('api')('@qase/v1.0#13qz761q8l6dvn602');

const qaseToken = process.env.QASE_API_TOKEN;

module.exports = class QaseApiHelper {
  static async getAllTestRuns() {
    try {
      await sdk.auth(qaseToken);
      const res = await sdk.getRuns({ limit: '100', offset: '0', code: 'INNCIRCLE' });
      return res;
    } catch (e) {
      return null;
    }
  }

  static async deleteTestRun(runId) {
    try {
      await sdk.auth(qaseToken);
      await sdk.deleteRun({ code: 'INNCIRCLE', id: runId });
    } catch (e) {
      //
    }
  }

  static async completeTestRun(runId) {
    try {
      await sdk.auth(qaseToken);
      await sdk.completeRun({ code: 'INNCIRCLE', id: runId });
    } catch (e) {
      //
    }
  }
};
