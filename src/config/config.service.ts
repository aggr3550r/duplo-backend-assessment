// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      console.info('env var value missing for - %s', this.env[key]);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', false);
    return mode == 'production';
  }

  public isDevelopment() {
    const mode = this.getValue('NODE_ENV', false)?.toLowerCase();
    return mode == 'development' || mode == 'dev' || mode == 'develop';
  }
}
const configService = new ConfigService(process.env);

export { configService };
