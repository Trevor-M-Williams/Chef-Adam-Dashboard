import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function EmailTemplate({
  submission,
}: {
  submission: Submission;
}) {
  const service = submission["service-info"].service.replaceAll("-", " ");
  const contactName =
    submission["contact-info"].name || submission["contact-info"]["poc-name"];
  const contactPhone =
    submission["contact-info"].phone || submission["contact-info"]["poc-phone"];
  const contactEmail = submission["contact-info"].email;

  return (
    <Html>
      <Head />

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Column></Column>

            <Column style={tableCell}>
              <Text style={heading}>New {service} order</Text>
            </Column>
          </Section>

          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>NAME</Text>
                    <Text style={informationTableValue}>{contactName}</Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>PHONE</Text>
                    <Text style={informationTableValue}>{contactPhone}</Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>EMAIL</Text>
                    <Text style={informationTableValue}>{contactEmail}</Text>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
};

const tableCell = { display: "table-cell" };

const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const informationTableRow = {
  height: "46px",
};

const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
};

const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};
