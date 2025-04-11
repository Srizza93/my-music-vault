// scripts/generate-env.ts
const { writeFileSync } = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const targetPath = './src/environments/environment.ts';

const environmentFileContent = `
export const environment = {
  production: false,
  supabaseApiKey: "${process.env['SUPABASE_API_KEY']}",
  supabaseUrl: "${process.env['SUPABASE_URL']}",
};
`;

writeFileSync(targetPath, environmentFileContent);
console.log(`✅ Environment file generated at ${targetPath}`);
