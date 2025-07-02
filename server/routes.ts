import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertClientSchema, 
  insertGoldItemSchema,
  insertLoanSchema,
  insertPaymentSchema,
  insertNotificationSchema,
  insertGoldPriceHistorySchema,
  insertDocumentSchema
} from "@shared/schema";
import { generateContractTemplate } from "./contract-generator";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware for handling validation errors
  const validateRequest = (schema: any) => {
    return (req: Request, res: Response, next: Function) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const validationError = fromZodError(error);
          res.status(400).json({ message: validationError.message });
        } else {
          res.status(400).json({ message: "Invalid request data" });
        }
      }
    };
  };

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await storage.getUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Don't send the password in the response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  app.post("/api/users", validateRequest(insertUserSchema), async (req, res) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(req.body);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  });

  // Client routes
  app.get("/api/clients", async (_req, res) => {
    const clients = await storage.getClients();
    res.json(clients);
  });

  app.get("/api/clients/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const client = await storage.getClient(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  });

  app.post("/api/clients", validateRequest(insertClientSchema), async (req, res) => {
    try {
      const client = await storage.createClient(req.body);
      res.status(201).json(client);
    } catch (error) {
      res.status(500).json({ message: "Error creating client" });
    }
  });

  // Gold Item routes
  app.get("/api/gold-items", async (_req, res) => {
    const goldItems = await storage.getGoldItems();
    res.json(goldItems);
  });

  app.get("/api/gold-items/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const goldItem = await storage.getGoldItem(id);
    if (!goldItem) {
      return res.status(404).json({ message: "Gold item not found" });
    }
    res.json(goldItem);
  });

  app.post("/api/gold-items", validateRequest(insertGoldItemSchema), async (req, res) => {
    try {
      const goldItem = await storage.createGoldItem(req.body);
      res.status(201).json(goldItem);
    } catch (error) {
      res.status(500).json({ message: "Error creating gold item" });
    }
  });

  // Loan routes
  app.get("/api/loans", async (req, res) => {
    const status = req.query.status as string | undefined;
    const loans = await storage.getLoans(status);
    res.json(loans);
  });

  app.get("/api/loans/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const loan = await storage.getLoan(id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.json(loan);
  });

  app.get("/api/clients/:clientId/loans", async (req, res) => {
    const clientId = parseInt(req.params.clientId);
    const loans = await storage.getLoansByClientId(clientId);
    res.json(loans);
  });

  app.post("/api/loans", validateRequest(insertLoanSchema), async (req, res) => {
    try {
      const loan = await storage.createLoan(req.body);
      res.status(201).json(loan);
    } catch (error) {
      res.status(500).json({ message: "Error creating loan" });
    }
  });

  app.patch("/api/loans/:id/status", async (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    
    const updatedLoan = await storage.updateLoanStatus(id, status);
    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    
    res.json(updatedLoan);
  });

  // Payment routes
  app.get("/api/loans/:loanId/payments", async (req, res) => {
    const loanId = parseInt(req.params.loanId);
    const payments = await storage.getPaymentsByLoanId(loanId);
    res.json(payments);
  });

  app.get("/api/payments/upcoming", async (req, res) => {
    const days = parseInt(req.query.days as string || "7");
    const payments = await storage.getUpcomingPayments(days);
    res.json(payments);
  });

  app.post("/api/payments", validateRequest(insertPaymentSchema), async (req, res) => {
    try {
      const payment = await storage.createPayment(req.body);
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ message: "Error creating payment" });
    }
  });

  app.patch("/api/payments/:id/status", async (req, res) => {
    const id = parseInt(req.params.id);
    const { status, paidDate } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    
    const updatedPayment = await storage.updatePaymentStatus(
      id, 
      status, 
      paidDate ? new Date(paidDate) : undefined
    );
    
    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    
    res.json(updatedPayment);
  });

  // Notification routes
  app.get("/api/users/:userId/notifications", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const notifications = await storage.getNotificationsByUserId(userId);
    res.json(notifications);
  });

  app.get("/api/users/:userId/notifications/unread", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const notifications = await storage.getUnreadNotificationsByUserId(userId);
    res.json(notifications);
  });

  app.post("/api/notifications", validateRequest(insertNotificationSchema), async (req, res) => {
    try {
      const notification = await storage.createNotification(req.body);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ message: "Error creating notification" });
    }
  });

  app.patch("/api/notifications/:id/read", async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedNotification = await storage.markNotificationAsRead(id);
    
    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    
    res.json(updatedNotification);
  });

  // Gold price routes (Malaysian Ringgit)
  app.get("/api/gold-price", async (_req, res) => {
    let goldPrice = await storage.getGoldPrice();
    if (!goldPrice) {
      // Create default gold price in Malaysian Ringgit
      goldPrice = await storage.createGoldPriceHistory({
        pricePerOz: 8889.25, // Current gold price in MYR per ounce
        date: new Date(),
      });
    }
    res.json(goldPrice);
  });

  app.get("/api/gold-price/history", async (req, res) => {
    const days = parseInt(req.query.days as string || "30");
    const priceHistory = await storage.getGoldPriceHistory(days);
    res.json(priceHistory);
  });

  app.post("/api/gold-price", validateRequest(insertGoldPriceHistorySchema), async (req, res) => {
    try {
      const goldPrice = await storage.createGoldPriceHistory(req.body);
      res.status(201).json(goldPrice);
    } catch (error) {
      res.status(500).json({ message: "Error creating gold price entry" });
    }
  });

  // Document routes
  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getAllDocuments();
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  app.get("/api/loans/:loanId/documents", async (req, res) => {
    const loanId = parseInt(req.params.loanId);
    const documents = await storage.getDocumentsByLoanId(loanId);
    res.json(documents);
  });

  app.post("/api/documents", validateRequest(insertDocumentSchema), async (req, res) => {
    try {
      const document = await storage.createDocument(req.body);
      res.status(201).json(document);
    } catch (error) {
      res.status(500).json({ message: "Error creating document" });
    }
  });

  // Generate contract document
  app.post("/api/documents/generate", async (req, res) => {
    try {
      const { loanId, templateType } = req.body;
      
      const loan = await storage.getLoan(loanId);
      if (!loan) {
        return res.status(404).json({ error: "Loan not found" });
      }

      const client = await storage.getClient(loan.clientId);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      const contractName = `${templateType}_Contract_${loan.contractNumber}`;
      const document = await storage.createDocument({
        name: contractName,
        type: "contract",
        status: "approved",
        loanId: loanId,
        documentNumber: `DOC-${Date.now()}`,
        issuingAuthority: "AR-Rahanu",
        expiryDate: null
      });

      res.json(document);
    } catch (error) {
      console.error("Error generating contract:", error);
      res.status(500).json({ error: "Failed to generate contract" });
    }
  });

  // Download contract template
  app.get("/api/contracts/template/:templateType", async (req, res) => {
    try {
      const { templateType } = req.params;
      const { loanId } = req.query;

      let loan = null;
      let client = null;

      if (loanId) {
        loan = await storage.getLoan(parseInt(loanId as string));
        if (loan) {
          client = await storage.getClient(loan.clientId);
        }
      }

      const contractContent = generateContractTemplate(templateType, loan, client);
      
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Disposition', `attachment; filename="${templateType}_contract.html"`);
      res.send(contractContent);
    } catch (error) {
      console.error("Error downloading template:", error);
      res.status(500).json({ error: "Failed to download template" });
    }
  });

  // Download document
  app.get("/api/documents/:id/download", async (req, res) => {
    try {
      const documentId = parseInt(req.params.id);
      const document = await storage.getDocument(documentId);
      
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }

      const loan = await storage.getLoan(document.loanId);
      const client = loan ? await storage.getClient(loan.clientId) : null;

      const contractContent = generateContractTemplate(document.type, loan, client);
      
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Disposition', `attachment; filename="${document.name}.html"`);
      res.send(contractContent);
    } catch (error) {
      console.error("Error downloading document:", error);
      res.status(500).json({ error: "Failed to download document" });
    }
  });

  app.patch("/api/documents/:id/status", async (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    
    const updatedDocument = await storage.updateDocumentStatus(id, status);
    
    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    
    res.json(updatedDocument);
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
