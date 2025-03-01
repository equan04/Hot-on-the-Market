import pandas as pd
import os

def create_dataframe(path):
    data_sub = pd.read_csv(f"{path}/sub.txt", sep="\t", on_bad_lines='skip')

    company_names = [
        "CAPITAL ONE FINANCIAL CORP",
        "APPLE INC",
        "DUOLINGO, INC.",
        "MCDONALDS CORP",
        "COSTCO WHOLESALE CORP /NEW",
        "TESLA, INC.",
        "NETFLIX INC",
        "AMAZON COM INC",
        "WALGREENS BOOTS ALLIANCE, INC.",
        "AIRBNB, INC.",
        "REDDIT, INC."
    ]

    sub_extracted_spec = data_sub[data_sub["name"].isin(company_names)]

    unique_adsh = sub_extracted_spec.adsh.unique()

    data = pd.read_csv(f"{path}/num.txt", sep="\t", on_bad_lines='skip')
    data_spec = data[data["adsh"].isin(unique_adsh)]

    xbrl_tags = [
        "Assets",
        "Liabilities",
        "StockholdersEquity",
        "Revenues",
        "RevenueFromContractWithCustomerExcludingAssessedTax",
        "NetIncomeLoss",
        "OperatingIncomeLoss",
        "ComprehensiveIncomeNetOfTax",
        "EarningsPerShareBasic",
        "EarningsPerShareDiluted",
        "CommonStockSharesOutstanding",
        "CashAndCashEquivalentsAtCarryingValue",
        "DebtSecuritiesAvailableForSaleExcludingAccruedInterest",
        "ProvisionForLoanLossesExpensed",
        "IncomeTaxExpenseBenefit",
        "AdjustmentsToAdditionalPaidInCapitalSharebasedCompensationRequisiteServicePeriodRecognitionValue",
        "AccumulatedOtherComprehensiveIncomeLossNetOfTax",
        "IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest",
        "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents"
    ]
    
    # pd.read_csv("combined_data.csv").isna().sum()

    tag_extracted_data = data_spec[data_spec['tag'].isin(xbrl_tags)]

    unit_of_measure_records = tag_extracted_data[["tag", "uom"]].drop_duplicates()

    tag_extracted_data = tag_extracted_data[["adsh", "tag", "value"]]
    tag_extracted_data = tag_extracted_data.groupby(["adsh", "tag"]).sum().reset_index()

    sub_extracted_spec = sub_extracted_spec[["adsh", "name", "fy", "fp"]]

    final = pd.merge(sub_extracted_spec, tag_extracted_data, on='adsh')

    final = final.pivot(index=["adsh", "name", "fy", "fp"], columns="tag", values="value")
    final.reset_index(level=["name", "fy", "fp"], inplace=True)
    final["fp"] = final["fp"].apply(lambda x: x if x != "FY" else "Q4/FY")

    return final

combined_dataframe = pd.DataFrame()

for dir in os.listdir("data"):
    if (dir.startswith(".")):
        continue
    df = create_dataframe(f"data/{dir}")

    combined_dataframe = pd.concat([combined_dataframe, df])

# combined_dataframe.reset_index(inplace=True)
# combined_dataframe.drop(["index"], axis=1, inplace=True)

combined_dataframe.sort_values(by=['name', 'fy', 'fp'], inplace=True)
combined_dataframe.to_csv("combined_data.csv")