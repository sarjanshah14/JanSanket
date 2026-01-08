import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Card, Alert, Button, Spinner, ListGroup } from 'react-bootstrap';
import { CheckCircleFill, ClockHistory } from 'react-bootstrap-icons';
import axios from 'axios';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

import './SuccessPage.css';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const [state, setState] = useState({
    loading: true,
    error: null,
    payment: null
  });

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');

      if (!sessionId) {
        setState({ loading: false, error: 'Missing payment session ID', payment: null });
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/verify-payment/', {
          params: { session_id: sessionId }
        });

        if (response.data.status === 'success') {
          setState({
            loading: false,
            error: null,
            payment: {
              id: response.data.payment_id,
              amount: response.data.amount,
              currency: response.data.currency,
              plan: response.data.plan_id,
              period: response.data.billing_period,
              nextBilling: response.data.next_billing_date,
              status: response.data.payment_status
            }
          });
        } else {
          setState({
            loading: false,
            error: response.data.message || 'Payment verification failed',
            payment: null
          });
        }
      } catch (err) {
        setState({
          loading: false,
          error: err.response?.data?.message || 'Payment verification error',
          payment: null
        });
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (state.loading) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Spinner animation="border" variant="danger" size="lg" />
        <p className="mt-3 text-muted fw-semibold">Verifying your payment...</p>
      </Container>
    );
  }

  if (state.error) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="shadow-lg p-4 rounded-4 border-0 w-100 error-card">
          <Alert variant="danger" className="text-center mb-4 rounded-3">
            <Alert.Heading className="fw-bold mb-2">❌ Payment Verification Failed</Alert.Heading>
            <p className="fw-semibold">{state.error}</p>
          </Alert>
          <div className="d-flex gap-3 justify-content-center">
            <Button variant="outline-danger" className="fw-semibold px-4" onClick={() => navigate('/pricing')}>
              Back to Pricing
            </Button>
            <Button variant="danger" className="fw-semibold px-4" onClick={() => window.location.reload()}>
              <ClockHistory className="me-2" />
              Try Again
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <div className="success-wrapper">
      {/* 🎉 Confetti only once */}
      <Confetti 
        width={width} 
        height={height} 
        numberOfPieces={250} 
        recycle={false} 
        colors={['#dc3545','#ffc107','#ffffff']} 
      />

      <Card className="shadow-lg border-0 rounded-4 overflow-hidden w-100 success-card">
        {/* Red Gradient Header */}
        <div className="bg-danger bg-gradient text-white text-center py-5 success-header">
          <CheckCircleFill size={70} className="mb-3 success-icon" />
          <h2 className="fw-bold mb-2">Payment Successful 🎉</h2>
          <p className="fs-5 fw-semibold mb-0">
            Your <span className="text-warning">{state.payment.plan}</span> plan is now active
          </p>
        </div>

        {/* Card Body */}
        <Card.Body className="p-4">
          <ListGroup variant="flush" className="mb-4 fs-6">
            <ListGroup.Item className="py-3 fw-semibold">
              Payment ID: <span className="text-dark">{state.payment.id || 'N/A'}</span>
            </ListGroup.Item>
            <ListGroup.Item className="py-3 fw-semibold">
              Amount Paid: <span className="text-success">{state.payment.amount} {state.payment.currency}</span>
            </ListGroup.Item>
            <ListGroup.Item className="py-3 fw-semibold">
              Plan: <span className="text-dark">{state.payment.plan} ({state.payment.period})</span>
            </ListGroup.Item>
            {state.payment.nextBilling && (
              <ListGroup.Item className="py-3 fw-semibold">
                Next Billing Date: <span className="text-dark">{new Date(state.payment.nextBilling).toLocaleDateString()}</span>
              </ListGroup.Item>
            )}
            <ListGroup.Item className="py-3 fw-semibold">
              Status:{" "}
              <span className={state.payment.status === 'paid' ? "text-success fw-bold" : "text-warning fw-bold"}>
                {state.payment.status}
              </span>
            </ListGroup.Item>
          </ListGroup>

          <div className="text-center">
            <Button
              variant="danger"
              size="lg"
              className="px-5 py-2 fw-bold rounded-pill shadow-sm"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard →
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SuccessPage;
