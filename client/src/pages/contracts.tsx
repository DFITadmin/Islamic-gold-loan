import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  FileText, 
  Download, 
  Printer, 
  Mail, 
  FilePlus, 
  FileCheck 
} from "lucide-react";
import { Document } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Contracts() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  
  const { data: documents, isLoading } = useQuery<Document[]>({
    queryKey: ["/api/documents"],
  });

  const downloadDocument = async (documentId: number) => {
    try {
      const response = await fetch(`/api/documents/${documentId}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `document_${documentId}.html`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const downloadTemplate = async (templateType: string) => {
    try {
      const response = await fetch(`/api/contracts/template/${templateType}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${templateType}_contract_template.html`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading template:', error);
    }
  };

  const filteredDocuments = documents?.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2
    }).format(numAmount);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getDocTypeIcon = (type: string) => {
    switch (type) {
      case "contract":
        return <FileText className="h-5 w-5 text-primary" />;
      case "identification":
        return <FileCheck className="h-5 w-5 text-secondary" />;
      case "gold_appraisal":
        return <FilePlus className="h-5 w-5 text-accent" />;
      default:
        return <FileText className="h-5 w-5 text-neutral-400" />;
    }
  };
  
  const formatDocumentType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Contracts</h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Manage Shariah-compliant contracts and documentation
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search contracts..." 
                className="pl-8 w-full" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="default">
              <FilePlus className="h-4 w-4 mr-2" />
              New Contract
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Contracts</p>
                  <h3 className="text-2xl font-bold mt-2">182</h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                  <h3 className="text-2xl font-bold mt-2">24</h3>
                </div>
                <div className="bg-yellow-500/10 p-2 rounded-full">
                  <FileCheck className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Templates</p>
                  <h3 className="text-2xl font-bold mt-2">8</h3>
                </div>
                <div className="bg-accent/10 p-2 rounded-full">
                  <FilePlus className="h-5 w-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="px-6 py-4 border-b border-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <CardTitle>Islamic Finance Contracts</CardTitle>
                <CardDescription>
                  Shariah-compliant documentation and contracts
                </CardDescription>
              </div>
              <div className="mt-4 md:mt-0">
                <Button variant="outline" className="mr-2">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      Loading documents...
                    </TableCell>
                  </TableRow>
                ) : !documents || documents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      No documents found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center">
                          {getDocTypeIcon(doc.type)}
                          <span className="ml-2">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.loanId}</TableCell>
                      <TableCell>{formatDocumentType(doc.type)}</TableCell>
                      <TableCell>{doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('ms-MY') : 'N/A'}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => downloadDocument(doc.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="px-6 py-4 border-t border-border flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredDocuments.length} of {documents?.length || 0} documents
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-6">
          <Card className="islamic-border border-primary">
            <CardHeader className="px-6 py-4 border-b border-border">
              <CardTitle>Shariah-Compliant Templates</CardTitle>
              <CardDescription>
                Standard Islamic finance contract templates for various financing scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex justify-between items-center w-full"
                  onClick={() => downloadTemplate('murabaha')}
                >
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Murabaha Gold Financing</p>
                      <p className="text-xs text-muted-foreground">Cost-plus financing agreement (MYR)</p>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex justify-between items-center w-full"
                  onClick={() => downloadTemplate('qard_hassan')}
                >
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Qard Hassan</p>
                      <p className="text-xs text-muted-foreground">Interest-free loan agreement (MYR)</p>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex justify-between items-center w-full"
                  onClick={() => downloadTemplate('musharakah')}
                >
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Musharakah Partnership</p>
                      <p className="text-xs text-muted-foreground">Joint venture contract (MYR)</p>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex justify-between items-center w-full"
                  onClick={() => downloadTemplate('wadiah')}
                >
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Wadiah Gold Safekeeping</p>
                      <p className="text-xs text-muted-foreground">Gold custodial agreement (MYR)</p>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
