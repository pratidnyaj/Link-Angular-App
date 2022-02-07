import { TeamsModule } from "./teams.module";

describe('productsModule', () => {
  let teamsModule: TeamsModule;

  beforeEach(() => {
    teamsModule = new TeamsModule();
  });

  it('should create an instance', () => {
    expect(teamsModule).toBeTruthy();
  });
});
