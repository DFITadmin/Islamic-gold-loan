import { Loan, Client } from "@shared/schema";

export function generateContractTemplate(templateType: string, loan?: Loan | null, client?: Client | null): string {
  const currentDate = new Date().toLocaleDateString('ms-MY');
  const contractNumber = loan?.contractNumber || `CONTRACT-${Date.now()}`;
  
  switch (templateType) {
    case "murabaha":
      return generateMurabahaContract(loan, client, contractNumber, currentDate);
    case "qard_hassan":
      return generateQardHassanContract(loan, client, contractNumber, currentDate);
    case "musharakah":
      return generateMusharakahContract(loan, client, contractNumber, currentDate);
    case "wadiah":
      return generateWadiahContract(loan, client, contractNumber, currentDate);
    default:
      return generateDefaultContract(templateType, loan, client, contractNumber, currentDate);
  }
}

function generateMurabahaContract(loan?: Loan | null, client?: Client | null, contractNumber?: string, currentDate?: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Murabaha Gold Financing Contract</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #2c5530; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #2c5530; }
        .contract-title { font-size: 20px; margin: 10px 0; }
        .section { margin: 20px 0; }
        .section-title { font-weight: bold; color: #2c5530; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .party-box { border: 1px solid #ddd; padding: 15px; margin: 10px 0; }
        .signature-section { margin-top: 50px; }
        .signature-box { display: inline-block; width: 300px; margin: 20px 50px 20px 0; }
        .signature-line { border-bottom: 1px solid #000; height: 30px; margin-bottom: 5px; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">AR-Rahanu</div>
        <div>Islamic Gold Financing Solutions</div>
        <div class="contract-title">MURABAHA GOLD FINANCING CONTRACT</div>
        <div>Contract No: ${contractNumber}</div>
        <div>Date: ${currentDate}</div>
    </div>

    <div class="section">
        <div class="section-title">PARTIES TO THE CONTRACT</div>
        
        <div class="party-box">
            <strong>THE FINANCIER (AR-Rahanu):</strong><br>
            AR-Rahanu Sdn Bhd<br>
            Registration No: 123456-X<br>
            Address: Kuala Lumpur, Malaysia<br>
            Islamic Banking License: BNM/IB/2024/001
        </div>

        <div class="party-box">
            <strong>THE CUSTOMER:</strong><br>
            Name: ${client?.fullName || '[Client Name]'}<br>
            IC/Passport: ${client?.identificationNumber || '[ID Number]'}<br>
            Address: ${client?.address || '[Client Address]'}<br>
            Phone: ${client?.phone || '[Phone Number]'}<br>
            Email: ${client?.email || '[Email]'}
        </div>
    </div>

    <div class="section">
        <div class="section-title">FINANCING DETAILS</div>
        <p><strong>Financing Amount:</strong> RM ${loan?.financingAmount || '[Amount]'}</p>
        <p><strong>Gold Items Value:</strong> RM ${loan?.totalGoldValue || '[Gold Value]'}</p>
        <p><strong>Profit Rate:</strong> ${loan?.profit || '[Rate]'}% per annum</p>
        <p><strong>Financing Period:</strong> ${loan?.term || '[Term]'} months</p>
        <p><strong>Monthly Payment:</strong> RM ${loan?.monthlyInstallment || '[Monthly Payment]'}</p>
        <p><strong>Total Amount Payable:</strong> RM ${loan?.totalAmount || '[Total Amount]'}</p>
    </div>

    <div class="section">
        <div class="section-title">SHARIAH COMPLIANCE</div>
        <p>This Murabaha contract is structured in accordance with Islamic banking principles:</p>
        <ul>
            <li>AR-Rahanu purchases the gold items from the customer at market value</li>
            <li>AR-Rahanu immediately sells the gold back to the customer at cost-plus-profit basis</li>
            <li>The profit margin is predetermined and disclosed upfront</li>
            <li>No interest (riba) is charged, only legitimate trade profit</li>
            <li>Contract complies with Bank Negara Malaysia Islamic finance guidelines</li>
        </ul>
    </div>

    <div class="section">
        <div class="section-title">TERMS AND CONDITIONS</div>
        <ol>
            <li>The Customer pledges the gold items as security for this financing</li>
            <li>Monthly payments are due on the same date each month</li>
            <li>Early settlement is permitted with rebate (Ibra) consideration</li>
            <li>Late payment will incur Ta'widh (compensation) as per Shariah guidelines</li>
            <li>Gold items remain in AR-Rahanu's custody until full settlement</li>
            <li>Insurance coverage is mandatory for the gold items</li>
            <li>This contract is governed by Malaysian law and Shariah principles</li>
        </ol>
    </div>

    <div class="section">
        <div class="section-title">SHARIAH ADVISOR CERTIFICATION</div>
        <p>This contract has been reviewed and approved by our Shariah Advisory Committee and complies with Islamic banking principles as per the rulings of Bank Negara Malaysia.</p>
        <p><strong>Shariah Advisor:</strong> [Name]<br>
        <strong>Certification Date:</strong> ${currentDate}<br>
        <strong>Certificate No:</strong> SAC-${contractNumber}</p>
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>Customer Signature</strong></div>
            <div>Name: ${client?.fullName || '[Client Name]'}</div>
            <div>Date: _______________</div>
        </div>

        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>AR-Rahanu Representative</strong></div>
            <div>Name: _______________</div>
            <div>Date: _______________</div>
        </div>
    </div>

    <div class="footer">
        <p>AR-Rahanu Sdn Bhd | Licensed Islamic Financial Institution | Regulated by Bank Negara Malaysia</p>
        <p>This contract is executed in accordance with Islamic Financial Services Act 2013</p>
    </div>
</body>
</html>
  `;
}

function generateQardHassanContract(loan?: Loan | null, client?: Client | null, contractNumber?: string, currentDate?: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Qard Hassan (Benevolent Loan) Contract</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #2c5530; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #2c5530; }
        .contract-title { font-size: 20px; margin: 10px 0; }
        .section { margin: 20px 0; }
        .section-title { font-weight: bold; color: #2c5530; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .party-box { border: 1px solid #ddd; padding: 15px; margin: 10px 0; }
        .signature-section { margin-top: 50px; }
        .signature-box { display: inline-block; width: 300px; margin: 20px 50px 20px 0; }
        .signature-line { border-bottom: 1px solid #000; height: 30px; margin-bottom: 5px; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">AR-Rahanu</div>
        <div>Islamic Gold Financing Solutions</div>
        <div class="contract-title">QARD HASSAN (BENEVOLENT LOAN) CONTRACT</div>
        <div>Contract No: ${contractNumber}</div>
        <div>Date: ${currentDate}</div>
    </div>

    <div class="section">
        <div class="section-title">PARTIES TO THE CONTRACT</div>
        
        <div class="party-box">
            <strong>THE LENDER (AR-Rahanu):</strong><br>
            AR-Rahanu Sdn Bhd<br>
            Registration No: 123456-X<br>
            Address: Kuala Lumpur, Malaysia<br>
            Islamic Banking License: BNM/IB/2024/001
        </div>

        <div class="party-box">
            <strong>THE BORROWER:</strong><br>
            Name: ${client?.fullName || '[Client Name]'}<br>
            IC/Passport: ${client?.identificationNumber || '[ID Number]'}<br>
            Address: ${client?.address || '[Client Address]'}<br>
            Phone: ${client?.phone || '[Phone Number]'}<br>
            Email: ${client?.email || '[Email]'}
        </div>
    </div>

    <div class="section">
        <div class="section-title">LOAN DETAILS</div>
        <p><strong>Loan Amount:</strong> RM ${loan?.financingAmount || '[Amount]'}</p>
        <p><strong>Repayment Period:</strong> ${loan?.term || '[Term]'} months</p>
        <p><strong>Monthly Repayment:</strong> RM ${loan?.monthlyInstallment || '[Monthly Payment]'}</p>
        <p><strong>Gold Collateral Value:</strong> RM ${loan?.totalGoldValue || '[Gold Value]'}</p>
        <p><strong>Interest Rate:</strong> 0% (Interest-free as per Islamic principles)</p>
    </div>

    <div class="section">
        <div class="section-title">QARD HASSAN PRINCIPLES</div>
        <p>This Qard Hassan (benevolent loan) is structured in accordance with Islamic principles:</p>
        <ul>
            <li>No interest (riba) is charged on this loan</li>
            <li>Only the principal amount is to be repaid</li>
            <li>Administrative fees may apply to cover actual costs</li>
            <li>This is a social welfare initiative by AR-Rahanu</li>
            <li>Complies with Shariah guidelines for benevolent lending</li>
        </ul>
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>Borrower Signature</strong></div>
            <div>Name: ${client?.fullName || '[Client Name]'}</div>
            <div>Date: _______________</div>
        </div>

        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>AR-Rahanu Representative</strong></div>
            <div>Name: _______________</div>
            <div>Date: _______________</div>
        </div>
    </div>

    <div class="footer">
        <p>AR-Rahanu Sdn Bhd | Licensed Islamic Financial Institution | Regulated by Bank Negara Malaysia</p>
    </div>
</body>
</html>
  `;
}

function generateMusharakahContract(loan?: Loan | null, client?: Client | null, contractNumber?: string, currentDate?: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Musharakah Partnership Contract</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #2c5530; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #2c5530; }
        .contract-title { font-size: 20px; margin: 10px 0; }
        .section { margin: 20px 0; }
        .section-title { font-weight: bold; color: #2c5530; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .party-box { border: 1px solid #ddd; padding: 15px; margin: 10px 0; }
        .signature-section { margin-top: 50px; }
        .signature-box { display: inline-block; width: 300px; margin: 20px 50px 20px 0; }
        .signature-line { border-bottom: 1px solid #000; height: 30px; margin-bottom: 5px; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">AR-Rahanu</div>
        <div>Islamic Gold Financing Solutions</div>
        <div class="contract-title">MUSHARAKAH PARTNERSHIP CONTRACT</div>
        <div>Contract No: ${contractNumber}</div>
        <div>Date: ${currentDate}</div>
    </div>

    <div class="section">
        <div class="section-title">PARTNERSHIP DETAILS</div>
        <p><strong>Partnership Capital:</strong> RM ${loan?.financingAmount || '[Amount]'}</p>
        <p><strong>AR-Rahanu Contribution:</strong> 70%</p>
        <p><strong>Partner Contribution:</strong> 30%</p>
        <p><strong>Profit Sharing Ratio:</strong> As per agreed terms</p>
        <p><strong>Gold Assets Value:</strong> RM ${loan?.totalGoldValue || '[Gold Value]'}</p>
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>Partner Signature</strong></div>
            <div>Name: ${client?.fullName || '[Client Name]'}</div>
            <div>Date: _______________</div>
        </div>

        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>AR-Rahanu Representative</strong></div>
            <div>Name: _______________</div>
            <div>Date: _______________</div>
        </div>
    </div>

    <div class="footer">
        <p>AR-Rahanu Sdn Bhd | Licensed Islamic Financial Institution | Regulated by Bank Negara Malaysia</p>
    </div>
</body>
</html>
  `;
}

function generateWadiahContract(loan?: Loan | null, client?: Client | null, contractNumber?: string, currentDate?: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Wadiah Gold Safekeeping Contract</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #2c5530; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #2c5530; }
        .contract-title { font-size: 20px; margin: 10px 0; }
        .section { margin: 20px 0; }
        .section-title { font-weight: bold; color: #2c5530; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .party-box { border: 1px solid #ddd; padding: 15px; margin: 10px 0; }
        .signature-section { margin-top: 50px; }
        .signature-box { display: inline-block; width: 300px; margin: 20px 50px 20px 0; }
        .signature-line { border-bottom: 1px solid #000; height: 30px; margin-bottom: 5px; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">AR-Rahanu</div>
        <div>Islamic Gold Financing Solutions</div>
        <div class="contract-title">WADIAH GOLD SAFEKEEPING CONTRACT</div>
        <div>Contract No: ${contractNumber}</div>
        <div>Date: ${currentDate}</div>
    </div>

    <div class="section">
        <div class="section-title">SAFEKEEPING DETAILS</div>
        <p><strong>Gold Items Value:</strong> RM ${loan?.totalGoldValue || '[Gold Value]'}</p>
        <p><strong>Safekeeping Period:</strong> ${loan?.termMonths || '[Term]'} months</p>
        <p><strong>Storage Fee:</strong> As per fee schedule</p>
        <p><strong>Insurance Coverage:</strong> Included</p>
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>Depositor Signature</strong></div>
            <div>Name: ${client?.fullName || '[Client Name]'}</div>
            <div>Date: _______________</div>
        </div>

        <div class="signature-box">
            <div class="signature-line"></div>
            <div><strong>AR-Rahanu Representative</strong></div>
            <div>Name: _______________</div>
            <div>Date: _______________</div>
        </div>
    </div>

    <div class="footer">
        <p>AR-Rahanu Sdn Bhd | Licensed Islamic Financial Institution | Regulated by Bank Negara Malaysia</p>
    </div>
</body>
</html>
  `;
}

function generateDefaultContract(templateType: string, loan?: Loan | null, client?: Client | null, contractNumber?: string, currentDate?: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Islamic Finance Contract</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #2c5530; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #2c5530; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">AR-Rahanu</div>
        <div>Islamic Gold Financing Solutions</div>
        <div>Contract No: ${contractNumber}</div>
        <div>Date: ${currentDate}</div>
    </div>
    <p>This is a standard Islamic finance contract template for ${templateType}.</p>
    <p>Client: ${client?.fullName || '[Client Name]'}</p>
    <p>Amount: RM ${loan?.financingAmount || '[Amount]'}</p>
</body>
</html>
  `;
}