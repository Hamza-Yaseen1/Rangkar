import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Row,
  Column,
  Img,
} from "@react-email/components";

export interface OrderItemData {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CustomerData {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
}

export interface OrderData {
  orderNumber: string;
  createdAt: string;
  customer: CustomerData;
  items: OrderItemData[];
  subtotal: number;
  total: number;
}

export default function OrderNotification({ order }: { order: OrderData }) {
  const formattedDate = new Date(order.createdAt).toLocaleString("en-PK", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <Html>
      <Head />
      <Preview>New Order #{order.orderNumber} — {formatPrice(order.total)}</Preview>
      <Body style={{ backgroundColor: "#FDFBF7", fontFamily: "system-ui, -apple-system, sans-serif", padding: "40px 20px" }}>
        <Container style={{ maxWidth: 600, margin: "0 auto" }}>
          {/* Header */}
          <Section style={{ textAlign: "center", marginBottom: 32 }}>
            <Text style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", color: "#1A1A1A", margin: 0 }}>
              <span style={{ color: "#9B2C2C" }}>Rang</span>kar
            </Text>
            <Text style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: "#9B7E3A", fontWeight: 600, marginTop: 8, marginBottom: 0 }}>
              New Order Received
            </Text>
          </Section>

          <Section style={{ backgroundColor: "#ffffff", borderRadius: 16, padding: 32, border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
            {/* Order Info */}
            <Section style={{ marginBottom: 24 }}>
              <Row>
                <Column>
                  <Text style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a1a1aa", fontWeight: 600, margin: 0 }}>
                    Order Number
                  </Text>
                  <Text style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", margin: "4px 0 0 0" }}>
                    {order.orderNumber}
                  </Text>
                </Column>
                <Column align="right">
                  <Text style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a1a1aa", fontWeight: 600, margin: 0 }}>
                    Date
                  </Text>
                  <Text style={{ fontSize: 13, color: "#52525b", margin: "4px 0 0 0" }}>
                    {formattedDate}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.05)", margin: "24px 0" }} />

            {/* Customer Info */}
            <Section style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: "#a1a1aa", fontWeight: 600, marginBottom: 8 }}>
                Customer Details
              </Text>
              <Text style={{ fontSize: 14, color: "#1A1A1A", fontWeight: 600, margin: 0 }}>
                {order.customer.fullName}
              </Text>
              <Text style={{ fontSize: 13, color: "#52525b", margin: "4px 0" }}>
                {order.customer.street}, {order.customer.city}, {order.customer.state} {order.customer.zip}
              </Text>
              <Text style={{ fontSize: 13, color: "#52525b", margin: 0 }}>
                {order.customer.phone}
              </Text>
              {order.customer.email && (
                <Text style={{ fontSize: 13, color: "#52525b", margin: "4px 0 0 0" }}>
                  {order.customer.email}
                </Text>
              )}
            </Section>

            <Hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.05)", margin: "24px 0" }} />

            {/* Items */}
            <Section>
              <Text style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: "#a1a1aa", fontWeight: 600, marginBottom: 12 }}>
                Order Items ({order.items.length})
              </Text>

              {/* Table Header */}
              <Row style={{ paddingBottom: 8, borderBottom: "1px solid rgba(0,0,0,0.05)", marginBottom: 8 }}>
                <Column style={{ width: 44 }} />
                <Column>
                  <Text style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a1a1aa", fontWeight: 600, margin: 0 }}>
                    Product
                  </Text>
                </Column>
                <Column style={{ width: 48, textAlign: "center" }}>
                  <Text style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a1a1aa", fontWeight: 600, margin: 0 }}>
                    Qty
                  </Text>
                </Column>
                <Column style={{ width: 80, textAlign: "right" }}>
                  <Text style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a1a1aa", fontWeight: 600, margin: 0 }}>
                    Total
                  </Text>
                </Column>
              </Row>

              {/* Items */}
              {order.items.map((item, i) => (
                <Row key={i} style={{ paddingTop: 8, paddingBottom: 8, borderBottom: i < order.items.length - 1 ? "1px solid rgba(0,0,0,0.03)" : "none" }}>
                  <Column style={{ width: 44, verticalAlign: "middle" }}>
                    <Img
                      src={item.imageUrl}
                      alt={item.name}
                      width={36}
                      height={44}
                      style={{ borderRadius: 8, objectFit: "cover", display: "block" }}
                    />
                  </Column>
                  <Column style={{ verticalAlign: "middle" }}>
                    <Text style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A", margin: 0 }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#a1a1aa", margin: "2px 0 0 0" }}>
                      {formatPrice(item.price)} each
                    </Text>
                  </Column>
                  <Column style={{ width: 48, textAlign: "center", verticalAlign: "middle" }}>
                    <Text style={{ fontSize: 13, color: "#52525b", margin: 0 }}>
                      {item.quantity}
                    </Text>
                  </Column>
                  <Column style={{ width: 80, textAlign: "right", verticalAlign: "middle" }}>
                    <Text style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A", margin: 0 }}>
                      {formatPrice(item.price * item.quantity)}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>

            <Hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.05)", margin: "24px 0" }} />

            {/* Totals */}
            <Section>
              <Row>
                <Column />
                <Column style={{ width: 200 }}>
                  <Row style={{ marginBottom: 8 }}>
                    <Column>
                      <Text style={{ fontSize: 13, color: "#52525b", margin: 0 }}>
                        Subtotal
                      </Text>
                    </Column>
                    <Column align="right">
                      <Text style={{ fontSize: 13, color: "#52525b", margin: 0 }}>
                        {formatPrice(order.subtotal)}
                      </Text>
                    </Column>
                  </Row>
                  <Row style={{ marginBottom: 8 }}>
                    <Column>
                      <Text style={{ fontSize: 13, color: "#52525b", margin: 0 }}>
                        Shipping
                      </Text>
                    </Column>
                    <Column align="right">
                      <Text style={{ fontSize: 13, color: "#16a34a", fontWeight: 600, margin: 0 }}>
                        {order.subtotal >= 5000 ? "Free" : "To be calculated"}
                      </Text>
                    </Column>
                  </Row>
                  <Hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: "12px 0" }} />
                  <Row>
                    <Column>
                      <Text style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A", margin: 0 }}>
                        Total
                      </Text>
                    </Column>
                    <Column align="right">
                      <Text style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", margin: 0 }}>
                        {formatPrice(order.total)}
                      </Text>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={{ textAlign: "center", marginTop: 32 }}>
            <Text style={{ fontSize: 12, color: "#a1a1aa", margin: 0 }}>
              Rangkar — Premium Pakistani Fashion
            </Text>
            <Text style={{ fontSize: 11, color: "#d4d4d8", margin: "4px 0 0 0" }}>
              This is an automated order notification. Do not reply to this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
