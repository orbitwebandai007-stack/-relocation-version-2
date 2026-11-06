import React from 'react';
import { WireframeHeader } from './WireframeHeader';
import { WireframeScreenProps } from './wireframeTypes';
import {
  ArrowRight,
  TrendingUp,
  MapPin,
  Building,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Sliders,
  ChevronRight,
  Layers,
  Sparkles,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { CITIES, formatINR } from '../../data/relocationData';

export const Screen02Dashboard: React.FC<WireframeScreenProps> = ({
  state,
  onUpdateState,
  onNavigate,
  scoredNeighbourhoods,
  chosenNeighbourhood,
  movingCosts,
  verdict,
  onStartNewPlan,
}) => {
  const currentCityData = CITIES[state.city] || CITIES.blr;
  const currentWp = state.wp || { name: 'Outer Ring Road (EcoSpace Bellandur)', lat: 12.926, lng: 77.683 };
  
  // Real calculations
  const monthlyInHand = state.sal || 174500;
  const monthlyExpenses = chosenNeighbourhood.x.tot;
  const monthlySurplus = Math.max(0, monthlyInHand - monthlyExpenses - state.com);
  const savingsRate = Math.round((monthlySurplus / monthlyInHand) * 100);
  const surplusDelta = verdict.savingsDeltaMonthly;

  const steps = [
    { num: 1, name: 'Destination City', screen: 3, val: currentCityData.name, done: true },
    { num: 2, name: 'Workplace Anchor', screen: 4, val: currentWp.name.split('·')[0].trim(), done: Boolean(state.wpConfirmed) },
    { num: 3, name: 'Compensation', screen: 5, val: `₹${state.annualLpa || 28} LPA`, done: true },
    { num: 4, name: 'Lifestyle & Housing', screen: 6, val: state.prop.toUpperCase(), done: true },
    { num: 5, name: 'Corridor Discovery', screen: 7, val: chosenNeighbourhood.a[0], done: Boolean(state.sel && state.sel.length > 0) },
    { num: 6, name: 'Relocation Blueprint', screen: 11, val: verdict.badgeLabel, done: true },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-[#18231E] flex flex-col select-none">
      <WireframeHeader
        activeNav="Dashboard"
        onNavigate={onNavigate}
        fromCity={state.from}
        destCityName={currentCityData.name}
        annualLpa={state.annualLpa || 28}
        onStartNewPlan={onStartNewPlan}
      />

      {/* Main Dashboard Canvas */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto p-6 sm:p-8 space-y-6">
        {/* Top Active Evaluation Banner */}
        <div className="bg-white border border-[#E2E5E9] rounded-xl p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#E8F4EF] border border-[#176B50]/20 flex items-center justify-center text-[#176B50] shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-[#176B50] text-white px-2 py-0.5 rounded font-bold">
                  ACTIVE EVALUATION #{state.city.toUpperCase()}-2026
                </span>
                <span className="text-xs text-[#5F6A63]">Live Decision Workspace</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-[#18231E] mt-1">
                Relocation Plan: {state.from} ➔ {currentCityData.name} ({currentWp.name.split('·')[0]})
              </h1>
              <p className="text-xs text-[#5F6A63]">
                Target Office: {currentWp.name} • Offer CTC: ₹{state.annualLpa || 28}.0 LPA • New Tax Regime
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate(10)}
              className="px-4 py-2 rounded-lg border border-[#E2E5E9] text-xs font-semibold text-[#18231E] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
            >
              What-If Scenarios
            </button>
            <button
              type="button"
              onClick={() => onNavigate(11)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#18231E] text-white text-xs font-semibold hover:bg-[#176B50] transition-colors cursor-pointer"
            >
              <span>View Relocation Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Core Financial KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-[#E2E5E9] rounded-xl p-5 shadow-2xs">
            <div className="flex justify-between items-start text-xs text-[#5F6A63]">
              <span>Monthly In-Hand Cash</span>
              <span className="text-[10px] font-mono bg-[#F3F4F6] px-1.5 py-0.5 rounded">NEW TAX REGIME</span>
            </div>
            <div className="text-2xl font-black text-[#18231E] mt-2">
              {formatINR(monthlyInHand)}<span className="text-xs font-normal text-[#5F6A63]">/mo</span>
            </div>
            <div className="text-xs text-[#176B50] font-medium mt-1">
              +{formatINR(Math.max(0, monthlyInHand - state.currentSal))}/mo over {state.from} base
            </div>
          </div>

          <div className="bg-white border border-[#E2E5E9] rounded-xl p-5 shadow-2xs">
            <div className="flex justify-between items-start text-xs text-[#5F6A63]">
              <span>Est. Monthly Outflow</span>
              <span className="text-[10px] font-mono bg-[#F3F4F6] px-1.5 py-0.5 rounded">
                {chosenNeighbourhood.a[0].toUpperCase()}
              </span>
            </div>
            <div className="text-2xl font-black text-[#18231E] mt-2">
              {formatINR(monthlyExpenses)}<span className="text-xs font-normal text-[#5F6A63]">/mo</span>
            </div>
            <div className="text-xs text-[#5F6A63] font-medium mt-1">
              Rent {formatINR(chosenNeighbourhood.x.e.rent)} • Living {formatINR(monthlyExpenses - chosenNeighbourhood.x.e.rent)}
            </div>
          </div>

          <div className="bg-white border border-[#176B50]/30 bg-[#F4F9F6] rounded-xl p-5 shadow-2xs">
            <div className="flex justify-between items-start text-xs text-[#176B50]">
              <span className="font-semibold">Projected Monthly Surplus</span>
              <span className="text-[10px] font-mono bg-[#176B50] text-white px-1.5 py-0.5 rounded font-bold">
                {savingsRate}% SAVINGS
              </span>
            </div>
            <div className="text-2xl font-black text-[#176B50] mt-2">
              +{formatINR(monthlySurplus)}<span className="text-xs font-normal text-[#176B50]/80">/mo</span>
            </div>
            <div className="text-xs text-[#176B50] font-medium mt-1">
              {surplusDelta > 0 ? `+${formatINR(surplusDelta)}/mo net incremental gain` : 'Balanced savings delta'}
            </div>
          </div>

          <div className="bg-white border border-[#E2E5E9] rounded-xl p-5 shadow-2xs">
            <div className="flex justify-between items-start text-xs text-[#5F6A63]">
              <span>Relocation Payback</span>
              <span className="text-[10px] font-mono bg-[#F3F4F6] px-1.5 py-0.5 rounded">
                SUNK COST RECOVERY
              </span>
            </div>
            <div className="text-2xl font-black text-[#18231E] mt-2">
              {verdict.economicPaybackMonths ? `${verdict.economicPaybackMonths} Months` : 'N/A'}
            </div>
            <div className="text-xs text-[#5F6A63] font-medium mt-1">
              Day-1 Cash: {formatINR(movingCosts.totalDay1CashRequired)} (Deposit locked: {formatINR(movingCosts.totalRecoverableCapital)})
            </div>
          </div>
        </div>

        {/* 6-Stage Relocation Journey Tracker */}
        <div className="bg-white border border-[#E2E5E9] rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E5E9]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#18231E]">
                Relocation Evaluation Pipeline
              </span>
              <span className="text-[10px] font-mono text-[#5F6A63]">• Click any stage to configure</span>
            </div>
            <span className="text-xs font-mono text-[#176B50] font-bold">STAGE 05 / 06 COMPLETE</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
            {steps.map((st) => (
              <div
                key={st.num}
                onClick={() => onNavigate(st.screen)}
                className="p-3 rounded-lg border border-[#E2E5E9] hover:border-[#176B50] bg-[#F8F9FA] hover:bg-white transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-[#5F6A63]">
                  <span>0{st.num}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#176B50]" />
                </div>
                <div className="text-xs font-bold text-[#18231E] group-hover:text-[#176B50] mt-1">
                  {st.name}
                </div>
                <div className="text-[11px] text-[#5F6A63] truncate mt-0.5">
                  {st.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Top Scored Corridor Highlight vs Decision Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Chosen Locality Highlight Card */}
          <div className="lg:col-span-7 bg-white border border-[#E2E5E9] rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#176B50] bg-[#E8F4EF] px-2 py-0.5 rounded uppercase">
                  {chosenNeighbourhood.badge}
                </span>
                <h3 className="text-lg font-bold text-[#18231E] mt-1.5">
                  {chosenNeighbourhood.a[0]} · Recommended Living Hub
                </h3>
                <p className="text-xs text-[#5F6A63] mt-0.5">
                  {chosenNeighbourhood.whyExplanation || chosenNeighbourhood.why}
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-[#176B50]">
                  {chosenNeighbourhood.sc}<span className="text-xs text-[#5F6A63]">/100</span>
                </div>
                <span className="text-[10px] font-mono text-[#5F6A63]">WORTHWHILE FIT SCORE</span>
              </div>
            </div>

            {/* Commute and Financial Snapshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8F9FA] p-3 rounded-lg border border-[#E2E5E9] text-xs">
              <div>
                <span className="text-[10px] text-[#5F6A63] block">Monthly Rent</span>
                <strong className="text-[#18231E]">{formatINR(chosenNeighbourhood.x.e.rent)}/mo</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#5F6A63] block">Deposit Lock</span>
                <strong className="text-[#C2410C]">{formatINR(chosenNeighbourhood.depositRequired)}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#5F6A63] block">Peak Commute</span>
                <strong className="text-[#176B50]">~{chosenNeighbourhood.peakMin || 20} min</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#5F6A63] block">Road Distance</span>
                <span className="text-[#18231E] font-medium">{chosenNeighbourhood.roadKm || chosenNeighbourhood.straightLineKm} km</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate(7)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#18231E] hover:bg-[#176B50] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Explore Interactive Map & All Corridors</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate(8)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E2E5E9] text-xs font-semibold text-[#18231E] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
              >
                <span>Compare Shortlist (3)</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate(9)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E2E5E9] text-xs font-semibold text-[#5F6A63] hover:text-[#18231E] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
              >
                <span>Financial Waterfall</span>
              </button>
            </div>
          </div>

          {/* Right Column: Relocation Verdict & Key Insights */}
          <div className="lg:col-span-5 bg-white border border-[#E2E5E9] rounded-xl p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E5E9]">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#18231E]">
                  <ShieldCheck className="w-4 h-4 text-[#176B50]" />
                  <span>DECISION VERDICT</span>
                </div>
                <span className="text-[10px] font-mono text-[#176B50] bg-[#E8F4EF] px-2 py-0.5 rounded font-bold">
                  {verdict.badgeLabel}
                </span>
              </div>

              <h4 className="text-sm font-bold text-[#18231E] mt-3">
                {verdict.headline}
              </h4>
              <p className="text-xs text-[#5F6A63] mt-1.5 leading-relaxed">
                {verdict.rationale}
              </p>

              {/* 4 Decision Pillars */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#E2E5E9]">
                  <span className="text-[10px] text-[#5F6A63] block">Monthly Surplus</span>
                  <strong className="text-[#176B50]">{verdict.pillars.surplus.metric}</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#E2E5E9]">
                  <span className="text-[10px] text-[#5F6A63] block">Savings Rate</span>
                  <strong className="text-[#18231E]">{verdict.pillars.savingsRate.metric}</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#E2E5E9]">
                  <span className="text-[10px] text-[#5F6A63] block">Upfront Liquidity</span>
                  <strong className="text-[#C2410C]">{verdict.pillars.liquidity.metric}</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#E2E5E9]">
                  <span className="text-[10px] text-[#5F6A63] block">Daily Commute</span>
                  <strong className="text-[#18231E]">{verdict.pillars.commute.metric}</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate(11)}
              className="w-full py-2.5 rounded-lg bg-[#176B50] hover:bg-[#125740] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Full Relocation Blueprint Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
