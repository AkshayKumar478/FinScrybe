
interface AccountantInvitationTemplateProps {
  email: string;
  department: string;
  invitationUrl: string;
}

export const accountantInvitationTemplate = ({
  email,
  department,
  invitationUrl,
}: AccountantInvitationTemplateProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FinScrybe Invitation</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f6f9;
        font-family: Arial, Helvetica, sans-serif;
      ">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="padding: 40px 16px;"
        >
          <tr>
            <td align="center">
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  max-width: 560px;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                "
              >
                <tr>
                  <td style="
                    background-color: #172554;
                    padding: 28px;
                    text-align: center;
                  ">
                    <h1 style="
                      margin: 0;
                      color: #ffffff;
                      font-size: 28px;
                    ">
                      FinScrybe
                    </h1>
                    <p style="
                      margin: 8px 0 0;
                      color: #cbd5e1;
                      font-size: 13px;
                    ">
                      Financial Intelligence Platform
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 36px 32px;">
                    <h2 style="
                      margin: 0 0 18px;
                      color: #1e293b;
                      font-size: 22px;
                    ">
                      You're invited!
                    </h2>

                    <p style="
                      color: #475569;
                      font-size: 15px;
                      line-height: 1.7;
                    ">
                      You have been invited to join a company on
                      FinScrybe as an Accountant.
                    </p>

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        margin: 24px 0;
                        background-color: #f8fafc;
                        border-radius: 8px;
                      "
                    >
                      <tr>
                        <td style="padding: 16px;">
                          <p style="margin: 0 0 10px; color: #64748b; font-size: 13px;">
                            Invited Email
                          </p>
                          <p style="margin: 0 0 18px; color: #1e293b; font-size: 15px;">
                            ${email}
                          </p>

                          <p style="margin: 0 0 10px; color: #64748b; font-size: 13px;">
                            Department
                          </p>
                          <p style="margin: 0; color: #1e293b; font-size: 15px;">
                            ${department}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style="
                      color: #475569;
                      font-size: 15px;
                      line-height: 1.7;
                    ">
                      To create your accountant account, click the
                      button below and complete your registration.
                    </p>

                    <table
                      cellpadding="0"
                      cellspacing="0"
                      style="margin: 28px auto;"
                    >
                      <tr>
                        <td
                          align="center"
                          bgcolor="#2563eb"
                          style="border-radius: 8px;"
                        >
                          <a
                            href="${invitationUrl}"
                            target="_blank"
                            style="
                              display: inline-block;
                              padding: 14px 28px;
                              color: #ffffff;
                              text-decoration: none;
                              font-size: 15px;
                              font-weight: bold;
                            "
                          >
                            Accept Invitation
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="
                      color: #64748b;
                      font-size: 13px;
                      line-height: 1.6;
                    ">
                      This invitation link expires in 24 hours.
                      If you weren't expecting this invitation,
                      you can safely ignore this email.
                    </p>

                    <p style="
                      color: #64748b;
                      font-size: 12px;
                      line-height: 1.6;
                      word-break: break-all;
                    ">
                      If the button doesn't work, copy this link
                      into your browser:
                      <br />
                      <a href="${invitationUrl}" style="color: #2563eb;">
                        ${invitationUrl}
                      </a>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding: 20px;
                    background-color: #f8fafc;
                    text-align: center;
                  ">
                    <p style="
                      margin: 0;
                      color: #94a3b8;
                      font-size: 12px;
                    ">
                      © ${new Date().getFullYear()} FinScrybe.
                      All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
