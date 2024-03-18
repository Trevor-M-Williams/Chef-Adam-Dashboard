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

  const eventAddress =
    submission["event-info"].address ||
    submission["event-info"]["marina-address"];
  const eventDate = submission["event-info"].date;
  const eventTime = submission["event-info"].time;
  const eventBoatName = submission["event-info"]["boat-name"];
  const eventPartySize = submission["event-info"]["party-size"];

  return (
    <Html>
      <Head />

      <Body style={main}>
        <Container style={container}>
          {/* ------------- Contact Info ------------- */}
          <Row>
            <Column>
              <Text style={heading}>Contact Info</Text>
            </Column>
          </Row>

          <Section style={sectionStyles}>
            <Row>
              <Column style={columnStyles}>
                <Text style={labelStyles}>NAME</Text>
                <Text style={valuesStyles}>{contactName}</Text>
              </Column>
            </Row>

            <Row>
              <Column style={columnStyles}>
                <Text style={labelStyles}>PHONE</Text>
                <Text style={valuesStyles}>{contactPhone}</Text>
              </Column>
            </Row>

            <Row>
              <Column style={columnStyles}>
                <Text style={labelStyles}>EMAIL</Text>
                <Text style={valuesStyles}>{contactEmail}</Text>
              </Column>
            </Row>
          </Section>

          {/* ------------- Service Info ------------- */}
          <Row>
            <Column>
              <Text style={heading}>Service Info</Text>
            </Column>
          </Row>

          <Section style={sectionStyles}>
            <Row style={rowStyles}>
              <Column style={columnStyles}>
                <Text style={labelStyles}>SERVICE</Text>
                <Text style={valuesStyles}>{service}</Text>
              </Column>
            </Row>

            {service === "meal plan" ? (
              <Row style={rowStyles}>
                <Column style={columnStyles}>
                  <Text style={labelStyles}>PLAN</Text>
                  <Text style={valuesStyles}>
                    {submission["service-info"]["meal-plan"]}
                  </Text>
                </Column>
              </Row>
            ) : (
              <Row style={rowStyles}>
                <Column style={columnStyles}>
                  <Text style={labelStyles}>VENUE</Text>
                  <Text style={valuesStyles}>
                    {submission["service-info"]["venue"]}
                  </Text>
                </Column>
              </Row>
            )}
          </Section>

          {service === "meal plan" ? (
            <>
              <Row>
                <Column>
                  <Text style={heading}>Meal Plan Info</Text>
                </Column>
              </Row>

              <Section style={sectionStyles}>
                <Row>
                  <Column style={columnStyles}>
                    <Text style={labelStyles}>AGE</Text>
                    <Text style={valuesStyles}>
                      {submission["meal-plan-info"].age}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={columnStyles}>
                    <Text style={labelStyles}>HEIGHT</Text>
                    <Text style={valuesStyles}>
                      {submission["meal-plan-info"]["height-ft"]}ft{" "}
                      {submission["meal-plan-info"]["height-in"]}in
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={columnStyles}>
                    <Text style={labelStyles}>WEIGHT</Text>
                    <Text style={valuesStyles}>
                      {submission["meal-plan-info"].weight}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={columnStyles}>
                    <Text style={labelStyles}>GOAL</Text>
                    <Text style={valuesStyles}>
                      {submission["meal-plan-info"].goal}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={columnStyles}>
                    <Text style={labelStyles}>ACTIVITY LEVEL</Text>
                    <Text style={valuesStyles}>
                      {submission["meal-plan-info"]["activity-level"]}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={columnStyles}>
                    <Text style={labelStyles}>ACTIVITIES</Text>
                    <Text style={valuesStyles}>
                      {submission["meal-plan-info"].activities}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={columnStyles}>
                    <Text style={labelStyles}>ALLERGIES</Text>
                    <Text style={valuesStyles}>
                      {submission["meal-plan-info"].allergies}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={columnStyles}>
                    <Text style={labelStyles}>FOODS</Text>
                    <Text style={valuesStyles}>
                      {submission["meal-plan-info"].fish && "Fish, "}
                      {submission["meal-plan-info"].shrimp && "Shrimp, "}
                      {submission["meal-plan-info"].chicken && "Chicken, "}
                      {submission["meal-plan-info"].beef && "Beef, "}
                      {submission["meal-plan-info"].pork && "Pork, "}
                      {submission["meal-plan-info"].turkey && "Turkey, "}
                      {submission["meal-plan-info"].lamb && "Lamb"}
                    </Text>
                  </Column>
                </Row>
              </Section>
            </>
          ) : (
            <>
              <Row>
                <Column>
                  <Text style={heading}>Event Info</Text>
                </Column>
              </Row>

              <Section style={sectionStyles}>
                <Row style={rowStyles}>
                  <Column style={columnStyles}>
                    <Text style={labelStyles}>ADDRESS</Text>
                    <Text style={valuesStyles}>{eventAddress}</Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={columnStyles}>
                    <Text style={labelStyles}>DATE</Text>
                    <Text style={valuesStyles}>{eventDate}</Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={columnStyles}>
                    <Text style={labelStyles}>TIME</Text>
                    <Text style={valuesStyles}>{eventTime}</Text>
                  </Column>
                </Row>

                {eventBoatName && (
                  <Row>
                    <Column style={columnStyles}>
                      <Text style={labelStyles}>BOAT NAME</Text>
                      <Text style={valuesStyles}>{eventBoatName}</Text>
                    </Column>
                  </Row>
                )}

                {eventPartySize && (
                  <Row>
                    <Column style={columnStyles}>
                      <Text style={labelStyles}>PARTY SIZE</Text>
                      <Text style={valuesStyles}>{eventPartySize}</Text>
                    </Column>
                  </Row>
                )}
              </Section>
            </>
          )}

          {/* ------------- Additional Info ------------- */}
          <Row>
            <Column>
              <Text style={heading}>Additional Info</Text>
            </Column>
          </Row>

          <Section style={sectionStyles}>
            <Row>
              <Column style={columnStyles}>
                <Text style={valuesStyles}>
                  {submission["additional-info"] || "N/A"}
                </Text>
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

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
};

const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

const sectionStyles = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
  marginBottom: "20px",
};

const rowStyles = {
  height: "46px",
};

const columnStyles = {
  padding: "8px 20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
};

const labelStyles = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
  color: "rgb(102,102,102)",
  fontSize: "16px",
};

const valuesStyles = {
  fontSize: "20px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};
