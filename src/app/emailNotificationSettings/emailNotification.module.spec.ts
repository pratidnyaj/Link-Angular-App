import { EmailNotificationModule } from "./emailNotification.module";


describe('emailNotificationModule', () => {
  let emailNotificationModule: EmailNotificationModule;

  beforeEach(() => {
    emailNotificationModule = new EmailNotificationModule();
  });

  it('should create an instance', () => {
    expect(emailNotificationModule).toBeTruthy();
  });
});
