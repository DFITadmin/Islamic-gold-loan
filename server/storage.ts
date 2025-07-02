import {
  users, type User, type InsertUser,
  clients, type Client, type InsertClient,
  goldItems, type GoldItem, type InsertGoldItem,
  loans, type Loan, type InsertLoan,
  payments, type Payment, type InsertPayment,
  notifications, type Notification, type InsertNotification,
  goldPriceHistory, type GoldPriceHistory, type InsertGoldPriceHistory,
  documents, type Document, type InsertDocument
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined>;
  
  // Client operations
  getClient(id: number): Promise<Client | undefined>;
  getClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, data: Partial<InsertClient>): Promise<Client | undefined>;
  
  // Gold Item operations
  getGoldItem(id: number): Promise<GoldItem | undefined>;
  getGoldItems(): Promise<GoldItem[]>;
  getGoldItemsByIds(ids: number[]): Promise<GoldItem[]>;
  createGoldItem(goldItem: InsertGoldItem): Promise<GoldItem>;
  
  // Loan operations
  getLoan(id: number): Promise<Loan | undefined>;
  getLoanByContractNumber(contractNumber: string): Promise<Loan | undefined>;
  getLoans(status?: string): Promise<Loan[]>;
  getLoansByClientId(clientId: number): Promise<Loan[]>;
  createLoan(loan: InsertLoan): Promise<Loan>;
  updateLoanStatus(id: number, status: string): Promise<Loan | undefined>;
  updateLoan(id: number, data: Partial<InsertLoan>): Promise<Loan | undefined>;
  
  // Payment operations
  getPayment(id: number): Promise<Payment | undefined>;
  getPaymentsByLoanId(loanId: number): Promise<Payment[]>;
  getUpcomingPayments(days: number): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePaymentStatus(id: number, status: string, paidDate?: Date): Promise<Payment | undefined>;
  
  // Notification operations
  getNotification(id: number): Promise<Notification | undefined>;
  getNotificationsByUserId(userId: number): Promise<Notification[]>;
  getUnreadNotificationsByUserId(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<Notification | undefined>;
  
  // Gold price operations
  getGoldPrice(): Promise<GoldPriceHistory | undefined>;
  getGoldPriceHistory(days: number): Promise<GoldPriceHistory[]>;
  createGoldPriceHistory(price: InsertGoldPriceHistory): Promise<GoldPriceHistory>;
  
  // Document operations
  getDocument(id: number): Promise<Document | undefined>;
  getDocumentsByLoanId(loanId: number): Promise<Document[]>;
  getAllDocuments(): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocumentStatus(id: number, status: string): Promise<Document | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private clients: Map<number, Client>;
  private goldItems: Map<number, GoldItem>;
  private loans: Map<number, Loan>;
  private payments: Map<number, Payment>;
  private notifications: Map<number, Notification>;
  private goldPriceHistory: Map<number, GoldPriceHistory>;
  private documents: Map<number, Document>;
  
  private currentUserId: number;
  private currentClientId: number;
  private currentGoldItemId: number;
  private currentLoanId: number;
  private currentPaymentId: number;
  private currentNotificationId: number;
  private currentGoldPriceHistoryId: number;
  private currentDocumentId: number;
  
  constructor() {
    this.users = new Map();
    this.clients = new Map();
    this.goldItems = new Map();
    this.loans = new Map();
    this.payments = new Map();
    this.notifications = new Map();
    this.goldPriceHistory = new Map();
    this.documents = new Map();
    
    this.currentUserId = 1;
    this.currentClientId = 1;
    this.currentGoldItemId = 1;
    this.currentLoanId = 1;
    this.currentPaymentId = 1;
    this.currentNotificationId = 1;
    this.currentGoldPriceHistoryId = 1;
    this.currentDocumentId = 1;
    
    // Initialize with sample admin user
    this.createUser({
      username: "admin",
      password: "admin123", // In a real app, this would be hashed
      fullName: "Admin User",
      email: "admin@almaal.com",
      phone: "+971501234567",
      role: "admin"
    });
    
    // Initialize current gold price
    this.createGoldPriceHistory({
      pricePerOz: 2023.45,
      date: new Date()
    });
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Client operations
  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }
  
  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }
  
  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = this.currentClientId++;
    const client: Client = { ...insertClient, id, createdAt: new Date() };
    this.clients.set(id, client);
    return client;
  }
  
  async updateClient(id: number, data: Partial<InsertClient>): Promise<Client | undefined> {
    const client = await this.getClient(id);
    if (!client) return undefined;
    
    const updatedClient = { ...client, ...data };
    this.clients.set(id, updatedClient);
    return updatedClient;
  }
  
  // Gold Item operations
  async getGoldItem(id: number): Promise<GoldItem | undefined> {
    return this.goldItems.get(id);
  }
  
  async getGoldItems(): Promise<GoldItem[]> {
    return Array.from(this.goldItems.values());
  }
  
  async getGoldItemsByIds(ids: number[]): Promise<GoldItem[]> {
    return ids.map(id => this.goldItems.get(id)).filter(Boolean) as GoldItem[];
  }
  
  async createGoldItem(insertGoldItem: InsertGoldItem): Promise<GoldItem> {
    const id = this.currentGoldItemId++;
    const goldItem: GoldItem = { ...insertGoldItem, id, createdAt: new Date() };
    this.goldItems.set(id, goldItem);
    return goldItem;
  }
  
  // Loan operations
  async getLoan(id: number): Promise<Loan | undefined> {
    return this.loans.get(id);
  }
  
  async getLoanByContractNumber(contractNumber: string): Promise<Loan | undefined> {
    return Array.from(this.loans.values()).find(
      (loan) => loan.contractNumber === contractNumber,
    );
  }
  
  async getLoans(status?: string): Promise<Loan[]> {
    if (status) {
      return Array.from(this.loans.values()).filter(loan => loan.status === status);
    }
    return Array.from(this.loans.values());
  }
  
  async getLoansByClientId(clientId: number): Promise<Loan[]> {
    return Array.from(this.loans.values()).filter(
      (loan) => loan.clientId === clientId,
    );
  }
  
  async createLoan(insertLoan: InsertLoan): Promise<Loan> {
    const id = this.currentLoanId++;
    const loan: Loan = { 
      ...insertLoan, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date(),
      startDate: null,
      endDate: null
    };
    this.loans.set(id, loan);
    return loan;
  }
  
  async updateLoanStatus(id: number, status: string): Promise<Loan | undefined> {
    const loan = await this.getLoan(id);
    if (!loan) return undefined;
    
    const updatedLoan = { ...loan, status, updatedAt: new Date() };
    this.loans.set(id, updatedLoan);
    return updatedLoan;
  }
  
  async updateLoan(id: number, data: Partial<InsertLoan>): Promise<Loan | undefined> {
    const loan = await this.getLoan(id);
    if (!loan) return undefined;
    
    const updatedLoan = { ...loan, ...data, updatedAt: new Date() };
    this.loans.set(id, updatedLoan);
    return updatedLoan;
  }
  
  // Payment operations
  async getPayment(id: number): Promise<Payment | undefined> {
    return this.payments.get(id);
  }
  
  async getPaymentsByLoanId(loanId: number): Promise<Payment[]> {
    return Array.from(this.payments.values()).filter(
      (payment) => payment.loanId === loanId,
    );
  }
  
  async getUpcomingPayments(days: number): Promise<Payment[]> {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + days);
    
    return Array.from(this.payments.values()).filter(
      (payment) => {
        const dueDate = new Date(payment.dueDate);
        return dueDate >= today && dueDate <= endDate && payment.status === 'pending';
      }
    );
  }
  
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = this.currentPaymentId++;
    const payment: Payment = { ...insertPayment, id, createdAt: new Date(), paidDate: null };
    this.payments.set(id, payment);
    return payment;
  }
  
  async updatePaymentStatus(id: number, status: string, paidDate?: Date): Promise<Payment | undefined> {
    const payment = await this.getPayment(id);
    if (!payment) return undefined;
    
    const updatedPayment = { 
      ...payment, 
      status, 
      paidDate: status === 'paid' ? paidDate || new Date() : payment.paidDate 
    };
    this.payments.set(id, updatedPayment);
    return updatedPayment;
  }
  
  // Notification operations
  async getNotification(id: number): Promise<Notification | undefined> {
    return this.notifications.get(id);
  }
  
  async getNotificationsByUserId(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(
      (notification) => notification.userId === userId,
    );
  }
  
  async getUnreadNotificationsByUserId(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(
      (notification) => notification.userId === userId && notification.status === 'unread',
    );
  }
  
  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = this.currentNotificationId++;
    const notification: Notification = { ...insertNotification, id, createdAt: new Date() };
    this.notifications.set(id, notification);
    return notification;
  }
  
  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const notification = await this.getNotification(id);
    if (!notification) return undefined;
    
    const updatedNotification = { ...notification, status: 'read' };
    this.notifications.set(id, updatedNotification);
    return updatedNotification;
  }
  
  // Gold price operations
  async getGoldPrice(): Promise<GoldPriceHistory | undefined> {
    // Return the most recent gold price
    const prices = Array.from(this.goldPriceHistory.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return prices[0];
  }
  
  async getGoldPriceHistory(days: number): Promise<GoldPriceHistory[]> {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);
    
    return Array.from(this.goldPriceHistory.values()).filter(
      (price) => new Date(price.date) >= startDate
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  
  async createGoldPriceHistory(insertPrice: InsertGoldPriceHistory): Promise<GoldPriceHistory> {
    const id = this.currentGoldPriceHistoryId++;
    const price: GoldPriceHistory = { ...insertPrice, id, createdAt: new Date() };
    this.goldPriceHistory.set(id, price);
    return price;
  }
  
  // Document operations
  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }
  
  async getDocumentsByLoanId(loanId: number): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(
      (document) => document.loanId === loanId,
    );
  }

  async getAllDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }
  
  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.currentDocumentId++;
    const document: Document = { ...insertDocument, id, createdAt: new Date() };
    this.documents.set(id, document);
    return document;
  }
  
  async updateDocumentStatus(id: number, status: string): Promise<Document | undefined> {
    const document = await this.getDocument(id);
    if (!document) return undefined;
    
    const updatedDocument = { ...document, status };
    this.documents.set(id, updatedDocument);
    return updatedDocument;
  }
}

import { db } from "./db";
import { eq } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getClient(id: number): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client || undefined;
  }

  async getClients(): Promise<Client[]> {
    return await db.select().from(clients);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const [client] = await db
      .insert(clients)
      .values(insertClient)
      .returning();
    return client;
  }

  async updateClient(id: number, data: Partial<InsertClient>): Promise<Client | undefined> {
    const [client] = await db
      .update(clients)
      .set(data)
      .where(eq(clients.id, id))
      .returning();
    return client || undefined;
  }

  async getGoldItem(id: number): Promise<GoldItem | undefined> {
    const [goldItem] = await db.select().from(goldItems).where(eq(goldItems.id, id));
    return goldItem || undefined;
  }

  async getGoldItems(): Promise<GoldItem[]> {
    return await db.select().from(goldItems);
  }

  async getGoldItemsByIds(ids: number[]): Promise<GoldItem[]> {
    if (ids.length === 0) return [];
    return await db.select().from(goldItems).where(
      ids.length === 1 
        ? eq(goldItems.id, ids[0])
        : goldItems.id.in(ids)
    );
  }

  async createGoldItem(insertGoldItem: InsertGoldItem): Promise<GoldItem> {
    const [goldItem] = await db
      .insert(goldItems)
      .values(insertGoldItem)
      .returning();
    return goldItem;
  }

  async getLoan(id: number): Promise<Loan | undefined> {
    const [loan] = await db.select().from(loans).where(eq(loans.id, id));
    return loan || undefined;
  }

  async getLoanByContractNumber(contractNumber: string): Promise<Loan | undefined> {
    const [loan] = await db.select().from(loans).where(eq(loans.contractNumber, contractNumber));
    return loan || undefined;
  }

  async getLoans(status?: string): Promise<Loan[]> {
    if (status) {
      return await db.select().from(loans).where(eq(loans.status, status));
    }
    return await db.select().from(loans);
  }

  async getLoansByClientId(clientId: number): Promise<Loan[]> {
    return await db.select().from(loans).where(eq(loans.clientId, clientId));
  }

  async createLoan(insertLoan: InsertLoan): Promise<Loan> {
    const [loan] = await db
      .insert(loans)
      .values(insertLoan)
      .returning();
    return loan;
  }

  async updateLoanStatus(id: number, status: string): Promise<Loan | undefined> {
    const [loan] = await db
      .update(loans)
      .set({ status })
      .where(eq(loans.id, id))
      .returning();
    return loan || undefined;
  }

  async updateLoan(id: number, data: Partial<InsertLoan>): Promise<Loan | undefined> {
    const [loan] = await db
      .update(loans)
      .set(data)
      .where(eq(loans.id, id))
      .returning();
    return loan || undefined;
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment || undefined;
  }

  async getPaymentsByLoanId(loanId: number): Promise<Payment[]> {
    return await db.select().from(payments).where(eq(payments.loanId, loanId));
  }

  async getUpcomingPayments(days: number): Promise<Payment[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    
    return await db.select().from(payments).where(
      eq(payments.status, "pending")
    );
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const [payment] = await db
      .insert(payments)
      .values(insertPayment)
      .returning();
    return payment;
  }

  async updatePaymentStatus(id: number, status: string, paidDate?: Date): Promise<Payment | undefined> {
    const [payment] = await db
      .update(payments)
      .set({ status, paidDate })
      .where(eq(payments.id, id))
      .returning();
    return payment || undefined;
  }

  async getNotification(id: number): Promise<Notification | undefined> {
    const [notification] = await db.select().from(notifications).where(eq(notifications.id, id));
    return notification || undefined;
  }

  async getNotificationsByUserId(userId: number): Promise<Notification[]> {
    return await db.select().from(notifications).where(eq(notifications.userId, userId));
  }

  async getUnreadNotificationsByUserId(userId: number): Promise<Notification[]> {
    return await db.select().from(notifications).where(
      eq(notifications.userId, userId)
    );
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const [notification] = await db
      .insert(notifications)
      .values(insertNotification)
      .returning();
    return notification;
  }

  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const [notification] = await db
      .update(notifications)
      .set({ status: "read" })
      .where(eq(notifications.id, id))
      .returning();
    return notification || undefined;
  }

  async getGoldPrice(): Promise<GoldPriceHistory | undefined> {
    const [price] = await db.select().from(goldPriceHistory)
      .orderBy(goldPriceHistory.date)
      .limit(1);
    return price || undefined;
  }

  async getGoldPriceHistory(days: number): Promise<GoldPriceHistory[]> {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - days);
    
    return await db.select().from(goldPriceHistory)
      .orderBy(goldPriceHistory.date);
  }

  async createGoldPriceHistory(insertPrice: InsertGoldPriceHistory): Promise<GoldPriceHistory> {
    const [price] = await db
      .insert(goldPriceHistory)
      .values(insertPrice)
      .returning();
    return price;
  }

  async getDocument(id: number): Promise<Document | undefined> {
    const [document] = await db.select().from(documents).where(eq(documents.id, id));
    return document || undefined;
  }

  async getDocumentsByLoanId(loanId: number): Promise<Document[]> {
    return await db.select().from(documents).where(eq(documents.loanId, loanId));
  }

  async getAllDocuments(): Promise<Document[]> {
    return await db.select().from(documents);
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const [document] = await db
      .insert(documents)
      .values(insertDocument)
      .returning();
    return document;
  }

  async updateDocumentStatus(id: number, status: string): Promise<Document | undefined> {
    const [document] = await db
      .update(documents)
      .set({ status })
      .where(eq(documents.id, id))
      .returning();
    return document || undefined;
  }
}

export const storage = new MemStorage();
