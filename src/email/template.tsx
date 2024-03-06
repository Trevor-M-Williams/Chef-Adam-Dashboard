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
              <Text style={heading}>Receipt</Text>
            </Column>
          </Section>

          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>NAME</Text>
                    <Text style={informationTableLabel}>{contactName}</Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>Phone</Text>
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

const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };
