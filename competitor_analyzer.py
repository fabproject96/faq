import streamlit as st
import pandas as pd
import plotly.express as px
from dotenv import load_dotenv
import os

# Configuration de la page
st.set_page_config(page_title="OperonCore Competitor Analyzer", layout="wide")

# Chargement des variables d'environnement
load_dotenv()

st.title("🚀 OperonCore: Competitor Comparison Tool")
st.markdown("Analysez le trafic, les mots-clés et estimez les revenus de vos concurrents.")

# Sidebar pour les paramètres de revenus
st.sidebar.header("Paramètres d'estimation")
conversion_rate = st.sidebar.slider("Taux de conversion (%)", 0.1, 10.0, 1.0, 0.1)
avg_order_value = st.sidebar.number_input("Panier moyen (€)", min_value=1, value=50)

# Input principal (multi-domaines)
domains_input = st.text_input("Entrez un ou plusieurs domaines (séparés par des virgules)", placeholder="apple.com, microsoft.com")

if domains_input:
    domains = [d.strip() for d in domains_input.split(",") if d.strip()]
    st.divider()
    
    if len(domains) > 0:
        st.info(f"Analyse comparative pour : **{', '.join(domains)}**")
        
        # Simulation de données pour la comparaison
        comparison_data = []
        all_traffic_data = []
        
        for idx, d in enumerate(domains):
            # Simulation de métriques par domaine
            base_traffic = 100000 + (idx * 50000) # Variation fictive
            traffic = base_traffic + 15000
            rev = (traffic * (conversion_rate / 100)) * avg_order_value
            kw_count = 3000 + (idx * 1200)
            
            comparison_data.append({
                "Domaine": d,
                "Trafic": f"{traffic:,}",
                "Revenu Est. (€)": f"{rev:,.2f}",
                "Mots-clés": f"{kw_count:,}"
            })
            
            # Données pour le graphique (6 mois)
            months = ['Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar']
            for i, m in enumerate(months):
                all_traffic_data.append({
                    "Mois": m,
                    "Visites": base_traffic + (i * 5000) + (idx * 10000),
                    "Domaine": d
                })

        # Tableau Comparatif Récapitulatif
        st.subheader("📊 Tableau Comparatif")
        st.table(pd.DataFrame(comparison_data))
        
        # Graphique de tendance multi-courbes
        st.subheader("📈 Évolution du trafic comparée")
        df_trends = pd.DataFrame(all_traffic_data)
        fig = px.line(df_trends, x='Mois', y='Visites', color='Domaine', markers=True, template="plotly_white")
        st.plotly_chart(fig, use_container_width=True)
        
        # Mots-clés (Détails par domaine dans des onglets)
        st.subheader("🔍 Détails des Mots-clés par domaine")
        tabs = st.tabs(domains)
        for i, tab in enumerate(tabs):
            with tab:
                d = domains[i]
                kw_df = pd.DataFrame({
                    'Mot-clé': [f'keyword {d} 1', f'keyword {d} 2', 'faq seo', 'schema markup'],
                    'Volume': [1000, 500, 1500, 2000],
                    'KD': [40, 30, 45, 60],
                    'Position': [1, 5, 2, 3]
                })
                st.dataframe(kw_df, use_container_width=True)
    
    st.success("Note: Ces données sont simulées. Connectez l'API DataForSEO pour obtenir les chiffres réels.")

else:
    st.write("Veuillez entrer un domaine pour commencer l'analyse.")
