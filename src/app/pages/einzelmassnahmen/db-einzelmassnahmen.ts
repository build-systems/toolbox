export interface DbEinzelmassnahmen {
  created_at: string;
  created_by: string;
  einzelmassnahmen_items: EinzelmassnahmenItem[];
  id: number;
  last_edited_at: string;
  last_edited_by: string;
  owned_by: string;
  title: string;
  vollkosten: number;
}

interface EinzelmassnahmenItem {
  id: number;
  position: number;
  project_id: number;
  title: BauteilText;
  einzelmassnahmen_values: EinzelmassnahmenValue[];
}

interface EinzelmassnahmenValue {
  id: number;
  item_id: number;
  position: number;
  project_id: number;
  title: EinzelmassnahmenValueTitle;
  unit: string;
  value: number;
}
