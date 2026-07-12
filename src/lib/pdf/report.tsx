/**
 * Geração do PDF do resultado (G2).
 *
 * Este módulo é importado DINAMICAMENTE (só quando o usuário baixa o PDF),
 * para manter o @react-pdf/renderer fora do bundle inicial.
 */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  pdf,
} from '@react-pdf/renderer'
import type { GuideResult } from '@/lib/result'
import { formatDateTime, formatDuration } from '@/lib/format'

const CDN = 'https://cdn.jsdelivr.net/fontsource/fonts'

Font.register({
  family: 'EB Garamond',
  fonts: [
    { src: `${CDN}/eb-garamond@latest/latin-400-normal.ttf` },
    { src: `${CDN}/eb-garamond@latest/latin-500-normal.ttf`, fontWeight: 500 },
    { src: `${CDN}/eb-garamond@latest/latin-400-italic.ttf`, fontStyle: 'italic' },
  ],
})
Font.register({
  family: 'Figtree',
  fonts: [
    { src: `${CDN}/figtree@latest/latin-400-normal.ttf` },
    { src: `${CDN}/figtree@latest/latin-500-normal.ttf`, fontWeight: 500 },
    { src: `${CDN}/figtree@latest/latin-600-normal.ttf`, fontWeight: 600 },
  ],
})
// Evita hifenização automática (quebra estranha de palavras).
Font.registerHyphenationCallback((word) => [word])

const C = {
  forest: '#22392e',
  moss: '#4b6b54',
  cream: '#ece6d8',
  cream50: '#f4f0e6',
  paper: '#f8f5ee',
  sage100: '#e6ecdf',
}

const s = StyleSheet.create({
  page: {
    backgroundColor: C.paper,
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontFamily: 'Figtree',
    fontSize: 10,
    color: C.forest,
  },
  kicker: {
    fontFamily: 'Figtree',
    fontWeight: 600,
    fontSize: 8,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: C.moss,
    marginBottom: 6,
  },
  title: { fontFamily: 'EB Garamond', fontSize: 26, color: C.forest },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 8 },
  metaItem: { fontSize: 8.5, color: '#22392eaa' },
  rule: { height: 1, backgroundColor: '#22392e1a', marginTop: 16, marginBottom: 4 },
  section: { marginTop: 18 },
  sectionTitle: {
    fontFamily: 'EB Garamond',
    fontSize: 14,
    color: C.forest,
    marginBottom: 8,
  },
  field: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#22392e12',
  },
  fieldLabel: {
    width: '42%',
    fontSize: 8,
    fontWeight: 600,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: C.moss,
    paddingRight: 10,
  },
  fieldValue: { width: '58%', fontSize: 10, color: C.forest, lineHeight: 1.4 },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7.5,
    color: '#22392e88',
    borderTopWidth: 0.5,
    borderTopColor: '#22392e1a',
    paddingTop: 8,
  },
  idBox: {
    marginTop: 10,
    backgroundColor: C.sage100,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  idLabel: {
    fontSize: 7,
    fontWeight: 600,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: C.moss,
  },
  idValue: { fontFamily: 'Figtree', fontSize: 11, color: C.forest, marginTop: 2 },
})

function ReportDocument({ result }: { result: GuideResult }) {
  return (
    <Document
      title={`Guia Paliativo APS · ${result.fillId}`}
      author="Guia Paliativo APS"
      subject="Resumo do atendimento"
    >
      <Page size="A4" style={s.page}>
        <Text style={s.kicker}>Guia Paliativo APS</Text>
        <Text style={s.title}>Resumo do atendimento</Text>
        <View style={s.metaRow}>
          <Text style={s.metaItem}>Realizado em {formatDateTime(result.finishedAt)}</Text>
          <Text style={s.metaItem}> · Duração {formatDuration(result.durationMs)}</Text>
        </View>

        <View style={s.idBox}>
          <Text style={s.idLabel}>Identificador do preenchimento</Text>
          <Text style={s.idValue}>{result.fillId}</Text>
        </View>

        <View style={s.rule} />

        {result.sections.map((section) => (
          <View key={section.title} style={s.section} wrap={false}>
            <Text style={s.sectionTitle}>{section.title}</Text>
            {section.fields.map((f, i) => (
              <View key={i} style={s.field}>
                <Text style={s.fieldLabel}>{f.label}</Text>
                <Text style={s.fieldValue}>{f.value}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={s.footer} fixed>
          <Text>Guia Paliativo APS · Documento anônimo, sem dados pessoais</Text>
          <Text
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  )
}

export async function buildReportBlob(result: GuideResult): Promise<Blob> {
  return pdf(<ReportDocument result={result} />).toBlob()
}

export function reportFileName(result: GuideResult): string {
  const short = result.fillId.slice(0, 8)
  return `guia-paliativo-${short}.pdf`
}
