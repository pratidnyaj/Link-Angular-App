import { RoleModule } from "./roleModule.module";

describe('RoleModule', () => {
  let rolemodule: RoleModule;

  beforeEach(() => {
    rolemodule = new RoleModule();
  });

  it('should create an instance', () => {
    expect(rolemodule).toBeTruthy();
  });
});


