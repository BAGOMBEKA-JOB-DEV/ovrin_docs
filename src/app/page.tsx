'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';

const features = [
  {
    title: 'Typed output',
    text: 'One Go struct. One reliable contract. No loose map leaks into your data pipeline.',
  },
  {
    title: 'Pipeline-first',
    text: 'Text extraction first, OCR on demand, validation and grounding built in from the start.',
  },
  {
    title: 'Explainable',
    text: 'Every value can point back to a page, region, and confidence signal so review is never a guess.',
  },
];

const codeSamples = [
  `package main

import (
    "context"
    "fmt"

    ovrin "github.com/BAGOMBEKA-JOB-DEV/ovrin"
)

type Invoice struct {
    Number   string  ` + '`ovrin:"invoice number,required"`' + `
    Vendor   string  ` + '`ovrin:"vendor company name"`' + `
    Currency string  ` + '`ovrin:"currency code,required,enum=UGX|USD|EUR|GBP"`' + `
    Total    float64 ` + '`ovrin:"total amount including tax,required,min=0"`' + `
}

func main() {
    client := ovrin.New()
    res, err := ovrin.Extract[Invoice](context.Background(), client, ovrin.File("invoice.pdf"))
    if err != nil { panic(err) }

    fmt.Println(res.Valid, res.NeedsReview)
    fmt.Printf("%+.2f\n", res.Data.Total)
}`,
  `package main

import (
    "context"
    "fmt"

    ovrin "github.com/BAGOMBEKA-JOB-DEV/ovrin"
)

type Receipt struct {
    Merchant string  ` + '`ovrin:"merchant name,required"`' + `
    Date     string  ` + '`ovrin:"transaction date,required"`' + `
    Total    float64 ` + '`ovrin:"total amount,required,min=0"`' + `
    Currency string  ` + '`ovrin:"currency,required,enum=UGX|USD|EUR|GBP"`' + `
}

func main() {
    client := ovrin.New()
    res, err := ovrin.Extract[Receipt](context.Background(), client, ovrin.File("receipt.jpg"))
    if err != nil { panic(err) }

    if !res.Valid || res.NeedsReview {
        fmt.Println("manual review required")
        return
    }

    fmt.Println(res.Data.Merchant, res.Data.Total)
}`,
  `package main

import (
    "context"
    "fmt"

    ovrin "github.com/BAGOMBEKA-JOB-DEV/ovrin"
)

type ClientSetup struct {
    Vendor string ` + '`ovrin:"vendor name,required"`' + `
    Tax    float64 ` + '`ovrin:"tax amount,min=0"`' + `
}

func main() {
    model := MyModel{}
    ocr := MyOCR{}
    renderer := MyRenderer{}

    client := ovrin.New(
        ovrin.WithModel(model),
        ovrin.WithOCR(ocr),
        ovrin.WithRenderer(renderer),
    )

    res, err := ovrin.Extract[ClientSetup](context.Background(), client, ovrin.File("invoice.pdf"))
    if err != nil { panic(err) }
    fmt.Println(res.Data.Vendor, res.Data.Tax)
}`,
  `package main

import (
    "context"
    "fmt"

    ovrin "github.com/BAGOMBEKA-JOB-DEV/ovrin"
)

type BankStatement struct {
    Account string  ` + '`ovrin:"account number,required"`' + `
    Balance float64 ` + '`ovrin:"closing balance,required,min=0"`' + `
    Date    string  ` + '`ovrin:"statement date,required"`' + `
}

func main() {
    client := ovrin.New()

    res, err := ovrin.Extract[BankStatement](context.Background(), client, ovrin.File("statement.pdf"))
    if err != nil { panic(err) }

    if res.NeedsReview {
        for _, reason := range res.Reasons {
            fmt.Println(reason)
        }
    }

    fmt.Println(res.Data.Balance)
}`,
  `package main

import (
    "context"
    "fmt"

    ovrin "github.com/BAGOMBEKA-JOB-DEV/ovrin"
)

type Contract struct {
    PartyA string ` + '`ovrin:"first party name,required"`' + `
    PartyB string ` + '`ovrin:"second party name,required"`' + `
    Value  float64 ` + '`ovrin:"contract value,required,min=0"`' + `
}

func main() {
    client := ovrin.New()
    res, err := ovrin.Extract[Contract](context.Background(), client, ovrin.File("contract.pdf"))
    if err != nil { panic(err) }

    if res.Valid {
        fmt.Println("contract accepted")
    } else {
        fmt.Println("validation failed; review required")
    }
}`,
  `package main

import (
    "context"
    "fmt"

    ovrin "github.com/BAGOMBEKA-JOB-DEV/ovrin"
)

type Form struct {
    Name      string ` + '`ovrin:"full name,required"`' + `
    Email     string ` + '`ovrin:"email address,required"`' + `
    Country   string ` + '`ovrin:"country code,required,enum=UGX|USD|EUR|GBP"`' + `
    Signature bool   ` + '`ovrin:"signature present,required"`' + `
}

func main() {
    client := ovrin.New()
    res, err := ovrin.Extract[Form](context.Background(), client, ovrin.File("form.pdf"))
    if err != nil { panic(err) }

    if !res.Valid {
        fmt.Println("schema invalid")
        return
    }

    fmt.Println(res.Data.Name, res.Data.Email)
}`,
  `package main

import (
    "context"
    "fmt"

    ovrin "github.com/BAGOMBEKA-JOB-DEV/ovrin"
)

type Claim struct {
    ClaimID   string  ` + '`ovrin:"claim id,required"`' + `
    Amount    float64 ` + '`ovrin:"claim amount,required,min=0"`' + `
    Currency  string  ` + '`ovrin:"currency code,required"`' + `
    Approved bool    ` + '`ovrin:"approval status"`' + `
}

func main() {
    client := ovrin.New()
    res, err := ovrin.Extract[Claim](context.Background(), client, ovrin.File("claim.pdf"))
    if err != nil { panic(err) }

    if res.NeedsReview {
        fmt.Println("manual review required before payout")
    }

    fmt.Println(res.Data.ClaimID, res.Data.Amount)
}`,
  `package main

import (
    "context"
    "fmt"

    ovrin "github.com/BAGOMBEKA-JOB-DEV/ovrin"
)

type InvoiceLine struct {
    SKU       string  ` + '`ovrin:"item code,required"`' + `
    Quantity  int     ` + '`ovrin:"quantity,required,min=1"`' + `
    UnitPrice float64 ` + '`ovrin:"unit price,required,min=0"`' + `
}

type PurchaseOrder struct {
    Number string        ` + '`ovrin:"purchase order number,required"`' + `
    Lines  []InvoiceLine ` + '`ovrin:"line items,required"`' + `
}

func main() {
    client := ovrin.New()
    res, err := ovrin.Extract[PurchaseOrder](context.Background(), client, ovrin.File("po.pdf"))
    if err != nil { panic(err) }

    for _, line := range res.Data.Lines {
        fmt.Println(line.SKU, line.Quantity, line.UnitPrice)
    }
}`,
  `package main

import (
    "context"
    "fmt"

    ovrin "github.com/BAGOMBEKA-JOB-DEV/ovrin"
)

type Patient struct {
    Name     string ` + '`ovrin:"patient name,required"`' + `
    Date     string ` + '`ovrin:"visit date,required"`' + `
    Amount   float64 ` + '`ovrin:"amount due,required,min=0"`' + `
    Covered  bool    ` + '`ovrin:"insurance coverage"`' + `
}

func main() {
    client := ovrin.New()
    res, err := ovrin.Extract[Patient](context.Background(), client, ovrin.File("claim.pdf"))
    if err != nil { panic(err) }

    fmt.Println("Confidence:", res.Confidence)
    fmt.Println("Needs review:", res.NeedsReview)
    fmt.Println(res.Data.Name, res.Data.Amount)
}`,
  `package main

import (
    "context"
    "fmt"

    ovrin "github.com/BAGOMBEKA-JOB-DEV/ovrin"
)

type Payroll struct {
    Employee string ` + '`ovrin:"employee name,required"`' + `
    Month    string ` + '`ovrin:"pay period,required"`' + `
    Gross    float64 ` + '`ovrin:"gross pay,required,min=0"`' + `
    Net      float64 ` + '`ovrin:"net pay,required,min=0"`' + `
}

func main() {
    client := ovrin.New()
    res, err := ovrin.Extract[Payroll](context.Background(), client, ovrin.File("payroll.pdf"))
    if err != nil { panic(err) }

    if !res.Valid {
        fmt.Println("payroll validation failed")
        return
    }

    fmt.Printf("%s earned %.2f net\n", res.Data.Employee, res.Data.Net)
}`
];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % codeSamples.length);
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#efefeb] text-slate-900 transition-colors duration-200 dark:bg-[#0b1220] dark:text-slate-100">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-[#f9f8f6] shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/80">
          <div className="grid gap-10 px-5 pb-8 pt-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:pb-10 lg:pt-12">
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
                  Document extraction for Go teams
                </span>

                <h1 className="mt-7 max-w-[620px] text-5xl font-black leading-[0.88] tracking-[-0.09em] text-slate-950 dark:text-white sm:text-6xl lg:text-[7rem]">
                  Turn documents into trusted structured data.
                </h1>
              </div>

              <div className="mt-8 max-w-xl">
                <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                  Ovrin reads PDFs, scans, images, and office files, then returns typed Go values with validation,
                  provenance, and reviewability built in.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/learn">Read the guide</Button>
                  <Button href="/reference/extract" variant="secondary">API reference</Button>
                </div>
              </div>
            </div>

            <aside className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-5 shadow-inner shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-950/80 dark:shadow-none">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Extraction
                </span>
                <div className="flex items-center gap-2">
                  {codeSamples.map((_, index) => (
                    <span
                      key={index}
                      className={[
                        'h-1.5 w-7 rounded-full transition-all',
                        index === activeIndex ? 'bg-blue-500 dark:bg-cyan-400' : 'bg-slate-300 dark:bg-slate-700',
                      ].join(' ')}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                  <span>Valid</span>
                  <span className="font-semibold text-slate-900 dark:text-white">99.2%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                </div>

                <div className="flex items-center justify-between pt-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>Grounded</span>
                  <span className="font-semibold text-slate-900 dark:text-white">18/20</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-indigo-500 to-sky-400" />
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-3 shadow-lg shadow-slate-900/10 dark:border-slate-700">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {codeSamples.map((sample, index) => (
                    <pre
                      key={index}
                      className="min-w-full overflow-x-auto whitespace-pre-wrap break-words p-2 font-mono text-[11px] leading-6 text-slate-100"
                    >
                      <code>{sample}</code>
                    </pre>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-[24px] border border-slate-200 bg-white/80 p-6 shadow-[0_16px_30px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900/80">
              <div className="mb-5 h-1.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              <h2 className="text-xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-white">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.text}</p>
            </article>
          ))}
        </section>
      </div>

    </main>
  );
}
