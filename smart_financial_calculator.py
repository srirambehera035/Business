import math
import json
import os

def calculate_financial_roadmap(available_margin_inr):
    """
    Module 2: Smart Financial Calculator & Scheme Router
    Implements Logic A and Logic B according to SIH26 Problem Statement.
    """
    if available_margin_inr <= 0:
        raise ValueError("Available margin must be greater than zero.")
    
    # 1. Financial Structuring
    project_cost = available_margin_inr / 0.10
    loan_amount = project_cost * 0.90
    
    # 2. Scheme Auto-Selection Router
    if project_cost <= 140000:
        scheme_name = "Micro Finance Scheme"
        scheme_logic = "Logic A (Small units up to ₹1.40 Lakh)"
        interest_rate_pa = 6.5
        tenure_years = 3
        moratorium_months = 3
        moratorium_quarters = 1
        total_quarters = 12
    elif project_cost <= 5000000:
        scheme_name = "Term Loan Scheme"
        scheme_logic = "Logic B (Projects between ₹1.40 Lakh and ₹50.00 Lakh)"
        interest_rate_pa = 8.0
        tenure_years = 7
        moratorium_months = 6
        moratorium_quarters = 2
        total_quarters = 28
    else:
        scheme_name = "Custom Commercial Consortium"
        scheme_logic = "Project cost exceeds standard ₹50 Lakh concessional cap"
        interest_rate_pa = 9.5
        tenure_years = 10
        moratorium_months = 12
        moratorium_quarters = 4
        total_quarters = 40

    # 3. Quarterly EMI & Moratorium Schedule Calculation
    repayment_quarters = total_quarters - moratorium_quarters
    quarterly_interest_rate = (interest_rate_pa / 100) / 4

    # Standard Amortization Formula: P * [ i(1+i)^n ] / [ (1+i)^n - 1 ]
    numerator = quarterly_interest_rate * math.pow(1 + quarterly_interest_rate, repayment_quarters)
    denominator = math.pow(1 + quarterly_interest_rate, repayment_quarters) - 1
    quarterly_emi = loan_amount * (numerator / denominator)
    monthly_equivalent = quarterly_emi / 3

    # Capital Allocation Breakdown (70% Capex vs 30% Working Capital/Opex)
    fixed_assets_capex = project_cost * 0.70
    working_capital_opex = project_cost * 0.30

    # Generate Amortization Table
    amortization_schedule = []
    current_balance = loan_amount

    # Moratorium Quarters
    for q in range(1, moratorium_quarters + 1):
        amortization_schedule.append({
            "quarter": q,
            "period_type": "Moratorium (Repayment Holiday)",
            "quarterly_installment_inr": 0.0,
            "principal_repaid_inr": 0.0,
            "interest_component_inr": 0.0,
            "remaining_balance_inr": round(current_balance, 2)
        })

    # Active Repayment Quarters
    for q in range(moratorium_quarters + 1, total_quarters + 1):
        interest_for_quarter = current_balance * quarterly_interest_rate
        principal_for_quarter = quarterly_emi - interest_for_quarter
        current_balance -= principal_for_quarter
        if current_balance < 0:
            current_balance = 0.0
        
        amortization_schedule.append({
            "quarter": q,
            "period_type": "Active Repayment",
            "quarterly_installment_inr": round(quarterly_emi, 2),
            "principal_repaid_inr": round(principal_for_quarter, 2),
            "interest_component_inr": round(interest_for_quarter, 2),
            "remaining_balance_inr": round(current_balance, 2)
        })

    total_repaid = quarterly_emi * repayment_quarters
    total_interest_paid = total_repaid - loan_amount

    return {
        "inputs": {
            "available_margin_capital_inr": available_margin_inr
        },
        "financial_structuring": {
            "total_project_cost_inr": round(project_cost, 2),
            "maximum_concessional_loan_inr": round(loan_amount, 2),
            "beneficiary_margin_contribution_inr": round(available_margin_inr, 2),
            "margin_percentage": "10%",
            "loan_percentage": "90%"
        },
        "scheme_routing": {
            "selected_scheme": scheme_name,
            "routing_logic": scheme_logic,
            "interest_rate_pa": f"{interest_rate_pa}%",
            "tenure": f"{tenure_years} Years ({total_quarters} Quarters)",
            "moratorium_period": f"{moratorium_months} Months ({moratorium_quarters} Quarters)"
        },
        "repayment_metrics": {
            "quarterly_emi_post_moratorium_inr": round(quarterly_emi, 2),
            "monthly_equivalent_emi_inr": round(monthly_equivalent, 2),
            "total_interest_payable_inr": round(total_interest_paid, 2),
            "total_amount_payable_inr": round(total_repaid, 2)
        },
        "capital_allocation": {
            "fixed_capital_equipment_capex_70_percent_inr": round(fixed_assets_capex, 2),
            "working_capital_and_operational_reserve_30_percent_inr": round(working_capital_opex, 2)
        },
        "quarterly_schedule": amortization_schedule
    }

if __name__ == '__main__':
    # Test with user example of ₹1,00,000 margin
    sample_margin = 100000
    res = calculate_financial_roadmap(sample_margin)
    print("=" * 60)
    print(" MODULE 2: SMART FINANCIAL CALCULATOR TEST RUN")
    print("=" * 60)
    print(f"Input Margin Capital: INR {res['inputs']['available_margin_capital_inr']:,}")
    print(f"Total Project Cost:   INR {res['financial_structuring']['total_project_cost_inr']:,}")
    print(f"Concessional Loan:    INR {res['financial_structuring']['maximum_concessional_loan_inr']:,}")
    print(f"Selected Scheme:      {res['scheme_routing']['selected_scheme']}")
    print(f"Interest Rate:        {res['scheme_routing']['interest_rate_pa']}")
    print(f"Tenure:               {res['scheme_routing']['tenure']}")
    print(f"Moratorium Period:    {res['scheme_routing']['moratorium_period']}")
    print(f"Quarterly EMI:        INR {res['repayment_metrics']['quarterly_emi_post_moratorium_inr']:,}")
    print(f"Monthly Equivalent:   INR {res['repayment_metrics']['monthly_equivalent_emi_inr']:,}")
    print("=" * 60)

    # Save to SIH directory
    sih_target = r"C:\Users\srira\OneDrive\Desktop\SIH\smart_financial_calculator.py"
    with open(__file__, 'r', encoding='utf-8') as src:
        content = src.read()
    with open(sih_target, 'w', encoding='utf-8') as dst:
        dst.write(content)
    print(f"Successfully copied calculator to {sih_target}")
