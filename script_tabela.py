import pandas as pd
import os

# coloque aqui os caminhos dos results.csv
files = {
    "FCF": r"C:\Users\imavi\OneDrive\Área de Trabalho\Results_IC\FCF\runs\detect\models\real_plus_synthetic3\results.csv",
    "FCF_FSF": r"C:\Users\imavi\OneDrive\Área de Trabalho\Results_IC\FCF_FSF\runs\detect\models\real_plus_synthetic\results.csv",
    "FSF": r"C:\Users\imavi\OneDrive\Área de Trabalho\Results_IC\FSF\runs\detect\models\real_plus_synthetic2\results.csv",
    "RCF": r"C:\Users\imavi\OneDrive\Área de Trabalho\Results_IC\RCF\runs\detect\models\real_plus_synthetic\results.csv",
    "RSF_FSF": r"C:\Users\imavi\OneDrive\Área de Trabalho\Results_IC\RSF_FSF\runs\detect\models\real_plus_synthetic\results.csv",
    "RSF_FSF_FCF": r"C:\Users\imavi\OneDrive\Área de Trabalho\Results_IC\RSF_FSF_FCF\runs\detect\models\real_plus_synthetic\results.csv",
    "RSF_RCF_FSF_FCF": r"C:\Users\imavi\OneDrive\Área de Trabalho\Results_IC\RSF_RCF_FSF_FCF\runs\detect\models\real_plus_synthetic\results.csv",
    "RSF": r"C:\Users\imavi\OneDrive\Área de Trabalho\Results_IC\RSF\runs\detect\models\real_plus_synthetic\results.csv"
}

results = []

for name, path in files.items():

    if not os.path.exists(path):
        print(f"Arquivo não encontrado: {path}")
        continue

    df = pd.read_csv(path)

    best = df.loc[df["metrics/mAP50-95(B)"].idxmax()]

    results.append({
        "experimento": name,
        "precision": best["metrics/precision(B)"],
        "recall": best["metrics/recall(B)"],
        "map50": best["metrics/mAP50(B)"],
        "map50-95": best["metrics/mAP50-95(B)"]
    })

final_df = pd.DataFrame(results)

final_df.to_csv("comparacao_modelos.csv", index=False)

print("\nTabela final:")
print(final_df)