import Link from "next/link";

export default function CompanyPage() {
  return (
    <main className="bg-[#FAF7F2] text-[#2A2421]">

      {/* ==========================================
          COMPANY HERO SECTION
      ========================================== */}

      <section className="relative overflow-hidden bg-[#111111] text-white">

        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

          <div className="max-w-4xl">

            {/* Company label */}
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#C9A038]">
              A ROMANOVA PERFUMES
            </p>

            {/* Main company headline */}
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              የልዩነት መዓዛ
              <span className="mt-3 block text-[#C9A038]">
                የማይረሳ ማንነት
              </span>
            </h1>

            {/* Company introduction */}
            <p className="mt-8 max-w-2xl text-lg leading-9 text-gray-300">
              A ROMANOVA የጥራት፣ የውበት እና የልዩነት
              መዓዛን ለደንበኞቻችን ለማቅረብ የተመሰረተ
              ዘመናዊ የPerfume ብራንድ ነው።
            </p>

            {/* Company action buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              {/* Login button */}
              <Link
                href="/login"
                className="rounded-lg bg-[#C9A038] px-8 py-4 font-semibold text-[#111111] transition hover:bg-[#E0B84F]"
              >
                ወደ ሱቅ ይግቡ
              </Link>

              {/* Sign up button */}
              <Link
                href="/signup"
                className="rounded-lg border border-white/30 px-8 py-4 font-semibold text-white transition hover:border-[#C9A038] hover:text-[#C9A038]"
              >
                መመዝገብ
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          ABOUT US SECTION
      ========================================== */}

      <section
        id="about"
        className="bg-white py-20 md:py-24"
      >

        <div className="mx-auto max-w-6xl px-6">

          <div className="mx-auto max-w-4xl text-center">

            {/* Section label */}
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B08D20]">
              About Us
            </p>

            {/* Section title */}
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              ስለ A ROMANOVA
            </h2>

            {/* About description */}
            <p className="mt-7 text-lg leading-9 text-gray-600">
              A ROMANOVA የወንዶች፣ የሴቶች እና Unisex
              የPerfume ምርቶችን በጥራት እና በተመጣጣኝ
              ዋጋ ለደንበኞች ለማቅረብ የሚሰራ ዘመናዊ
              የPerfume ብራንድ ነው።
            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          COMPANY VALUES SECTION
      ========================================== */}

      <section
        id="values"
        className="bg-[#F8F5EF] py-20 md:py-24"
      >

        <div className="mx-auto max-w-7xl px-6">

          {/* Section heading */}
          <div className="mb-14 text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B08D20]">
              Our Values
            </p>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              የእኛ እሴቶች
            </h2>

          </div>


          {/* Values cards */}
          <div className="grid gap-8 md:grid-cols-3">

            {/* Quality */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">

              <div className="mb-5 text-4xl text-[#C9A038]">
                ✦
              </div>

              <h3 className="mb-4 text-2xl font-bold">
                ጥራት
              </h3>

              <p className="leading-8 text-gray-600">
                ለደንበኞቻችን ጥራት ያለውን እና
                አስተማማኝ የPerfume ምርት ማቅረብ።
              </p>

            </div>


            {/* Customer satisfaction */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">

              <div className="mb-5 text-4xl text-[#C9A038]">
                ♡
              </div>

              <h3 className="mb-4 text-2xl font-bold">
                ደንበኛ
              </h3>

              <p className="leading-8 text-gray-600">
                የደንበኞቻችንን እርካታ እና ጥሩ የግዢ
                ልምድ ከሁሉም ነገር በላይ እናስቀድማለን።
              </p>

            </div>


            {/* Uniqueness */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">

              <div className="mb-5 text-4xl text-[#C9A038]">
                ◆
              </div>

              <h3 className="mb-4 text-2xl font-bold">
                ልዩነት
              </h3>

              <p className="leading-8 text-gray-600">
                እያንዳንዱ ሰው የራሱ ልዩ ማንነት
                እንዳለው እናምናለን።
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          VISION AND MISSION SECTION
      ========================================== */}

      <section
        id="vision"
        className="bg-[#111111] py-20 text-white md:py-24"
      >

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid gap-12 md:grid-cols-2">

            {/* Vision */}
            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                Our Vision
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                ራዕያችን
              </h2>

              <p className="mt-6 text-lg leading-9 text-gray-300">
                በኢትዮጵያ ውስጥ በጥራት፣ በፈጠራ
                እና በደንበኛ እርካታ የሚታወቅ
                የPerfume ብራንድ መሆን።
              </p>

            </div>


            {/* Mission */}
            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                Our Mission
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                ተልዕኮአችን
              </h2>

              <p className="mt-6 text-lg leading-9 text-gray-300">
                ደንበኞቻችን የሚፈልጉትን ልዩ መዓዛ
                በቀላል፣ በዘመናዊ እና በአስተማማኝ
                Online Shopping ልምድ ማቅረብ።
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          CALL TO ACTION SECTION
      ========================================== */}

      <section className="bg-[#C9A038] py-20">

        <div className="mx-auto max-w-5xl px-6 text-center">

          {/* CTA heading */}
          <h2 className="text-4xl font-bold text-[#111111] md:text-5xl">
            የራስዎን ልዩ መዓዛ ያግኙ
          </h2>

          {/* CTA description */}
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#2A2421]">
            የA ROMANOVA የPerfume ምርቶችን ዛሬውኑ
            ይመልከቱ እና የሚስማማዎትን ልዩ መዓዛ ያግኙ።
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">

            {/* Login CTA */}
            <Link
              href="/login"
              className="rounded-lg bg-[#111111] px-8 py-4 font-semibold text-white transition hover:bg-gray-800"
            >
              Login
            </Link>

            {/* Signup CTA */}
            <Link
              href="/signup"
              className="rounded-lg border-2 border-[#111111] px-8 py-4 font-semibold text-[#111111] transition hover:bg-[#111111] hover:text-white"
            >
              Sign Up
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}