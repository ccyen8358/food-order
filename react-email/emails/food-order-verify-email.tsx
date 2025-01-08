import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface FoodOrderVerifyEmailProps {
  shopName?: string;
  verifyUrl?: string;
}

const baseUrl = process.env.LOGO_URL
  ? `https://${process.env.LOGO_URL}`
  : "/static";

export default function FoodOrderVerifyEmail({
  shopName = "Foodord",
  verifyUrl = "http://localhost:3000/",
}: FoodOrderVerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`${baseUrl}/foodord_white.png`}
                width="200"
                height="70"
                style={logo}
                alt={`${shopName}'s Logo`}
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                Thanks for creating a new account. To complete your account
                creation please verify your email address:
              </Text>
              <Button style={button} href={verifyUrl}>
                Click to verify your email address
              </Button>
              <Text style={cautionText}>
                If you don&apos;t recall creating an account, please ignore this
                message.
              </Text>
              {/* <Section style={verificationSection}>
                <Link
                  href={verifyUrl}
                  target="_blank"
                  style={{
                    ...link,
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Click to verify your email address
                </Link>{" "}
              </Section> */}
            </Section>
          </Section>
          {/* <Text style={footerText}>
            This message was produced and distributed by Amazon Web Services,
            Inc., 410 Terry Ave. North, Seattle, WA 98109. © 2022, Amazon Web
            Services, Inc.. All rights reserved. AWS is a registered trademark
            of{" "}
            <Link href="https://amazon.com" target="_blank" style={link}>
              Amazon.com
            </Link>
            , Inc. View our{" "}
            <Link href="https://amazon.com" target="_blank" style={link}>
              privacy policy
            </Link>
            .
          </Text> */}
        </Container>
      </Body>
    </Html>
  );
}

FoodOrderVerifyEmail.PreviewProps = {
  shopName: "Foodord",
} as FoodOrderVerifyEmailProps;

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#252f3d",
  // display: "flex",
  padding: "20px 0",
  // alignItems: "center",
  // justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const verificationSection = {
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };

const logo = {
  margin: "0 auto",
};

const button = {
  ...text,
  backgroundColor: "#e96f2e",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "10px",
};
