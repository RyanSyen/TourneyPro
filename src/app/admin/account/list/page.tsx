import Link from "next/link";

import CustomContainer from "@/components/common/customContainer";
import { Button } from "@/components/ui/button";

import AdminNavbar from "../../navbar";
import { Account, columns } from "./datatable/columns";
import { DataTable } from "./datatable/dataTable";

async function getData(): Promise<Account[]> {
  return [
    {
      userId: "95cfdc21-3038-4b8f-bf18-268c4b65e03d",
      fullName: "wskelbeck0",
      emailAddress: "lknoton0@last.fm",
      mobileNumber: "9804160603",
      role: "organizer",
      status: "inactive",
    },
    {
      userId: "ec9854ee-2a34-461a-87df-91bc881a3fa0",
      fullName: "jbunt1",
      emailAddress: "ekops1@alibaba.com",
      mobileNumber: "9276813198",
      role: "organizer",
      status: "active",
    },
    {
      userId: "2a7ea299-615a-4ec2-8548-582d8284c53d",
      fullName: "jebbings2",
      emailAddress: "zgores2@cpanel.net",
      mobileNumber: "7213071927",
      role: "organizer",
      status: "active",
    },
    {
      userId: "e936eba7-84d1-44f8-92b5-79b7b12a6c10",
      fullName: "cbartlomieczak3",
      emailAddress: "obore3@china.com.cn",
      mobileNumber: "4931023579",
      role: "admin",
      status: "active",
    },
    {
      userId: "0126267c-eab5-493b-8c11-e447265294f8",
      fullName: "lkilday4",
      emailAddress: "lstean4@noaa.gov",
      mobileNumber: "4503728476",
      role: "organizer",
      status: "inactive",
    },
    {
      userId: "960cfd5a-c676-442d-94cf-472bc791fd44",
      fullName: "mweavill5",
      emailAddress: "pglasheen5@wiley.com",
      mobileNumber: "2024623717",
      role: "admin",
      status: "inactive",
    },
    {
      userId: "53fa4589-a8e2-4d9c-822b-b267d7570616",
      fullName: "qtailour6",
      emailAddress: "abaskeyfield6@ibm.com",
      mobileNumber: "1825726785",
      role: "player",
      status: "inactive",
    },
    {
      userId: "c1b402d7-5389-4ca6-a14d-8b1b6e9c1431",
      fullName: "ctillman7",
      emailAddress: "mcruxton7@moonfruit.com",
      mobileNumber: "3227671187",
      role: "player",
      status: "active",
    },
    {
      userId: "9b7c4343-d89d-41ee-803c-74a2328ca44e",
      fullName: "jgilfether8",
      emailAddress: "otomlinson8@cafepress.com",
      mobileNumber: "2149873573",
      role: "admin",
      status: "active",
    },
    {
      userId: "0242453c-6ee1-4db9-bce5-b8bb7f1faf29",
      fullName: "rdeathe9",
      emailAddress: "fmerrywether9@slideshare.net",
      mobileNumber: "4662682580",
      role: "admin",
      status: "inactive",
    },
    {
      userId: "dc0320f1-297e-4e36-b1b6-72656128c79b",
      fullName: "gdowa",
      emailAddress: "bmucka@howstuffworks.com",
      mobileNumber: "3395223122",
      role: "admin",
      status: "inactive",
    },
    {
      userId: "7da16e27-e938-47a3-91fb-ff2030363813",
      fullName: "rboichatb",
      emailAddress: "clysterb@purevolume.com",
      mobileNumber: "5777784068",
      role: "player",
      status: "inactive",
    },
    {
      userId: "3dfa908c-ade2-4931-8a00-bf7a0b7111fc",
      fullName: "nravilusc",
      emailAddress: "rfarryanc@free.fr",
      mobileNumber: "4173961975",
      role: "admin",
      status: "inactive",
    },
    {
      userId: "12828d5b-c3ad-4978-8c5d-a2f83ee763c1",
      fullName: "hcreffieldd",
      emailAddress: "pspinolad@theatlantic.com",
      mobileNumber: "8528635933",
      role: "player",
      status: "inactive",
    },
    {
      userId: "2c284eaf-a5ad-4401-9b84-d94889f08014",
      fullName: "eputtane",
      emailAddress: "wspierse@nhs.uk",
      mobileNumber: "5526619074",
      role: "player",
      status: "inactive",
    },
    {
      userId: "60e3e8b5-36e0-4487-b49a-91bed3d3024c",
      fullName: "gofenf",
      emailAddress: "blemmef@friendfeed.com",
      mobileNumber: "1902409682",
      role: "player",
      status: "active",
    },
    {
      userId: "46fcf44b-0110-468c-a373-3eef73ad883a",
      fullName: "pcazing",
      emailAddress: "bcarluccig@meetup.com",
      mobileNumber: "4878658749",
      role: "player",
      status: "inactive",
    },
    {
      userId: "80451ea4-74c1-4f5a-be9c-8e66ece18d88",
      fullName: "ddysharth",
      emailAddress: "wlabrenzh@canalblog.com",
      mobileNumber: "8726397813",
      role: "organizer",
      status: "active",
    },
    {
      userId: "12d45104-36ec-4504-a9e4-622ecff741ae",
      fullName: "wbigginsi",
      emailAddress: "hcliffi@angelfire.com",
      mobileNumber: "7126730869",
      role: "organizer",
      status: "active",
    },
    {
      userId: "6aa79d7d-08f8-435f-81c8-bdc7c1a711f5",
      fullName: "svandendaelj",
      emailAddress: "mhelwigj@sciencedaily.com",
      mobileNumber: "4424632891",
      role: "admin",
      status: "inactive",
    },
    {
      userId: "607082ef-ca01-4727-b574-f0f0d73b5fab",
      fullName: "nseeark",
      emailAddress: "mameyk@senate.gov",
      mobileNumber: "2928803195",
      role: "player",
      status: "inactive",
    },
    {
      userId: "f48c1a66-aadf-4c68-b1e3-66ac897a81d6",
      fullName: "rmogral",
      emailAddress: "ebrumfittl@github.com",
      mobileNumber: "6382309820",
      role: "admin",
      status: "inactive",
    },
    {
      userId: "1a314dc7-131e-44ec-9784-d42c6938030b",
      fullName: "wrowneym",
      emailAddress: "hpruvostm@squidoo.com",
      mobileNumber: "9702128582",
      role: "organizer",
      status: "inactive",
    },
    {
      userId: "bfa9c053-a171-402b-934d-8a61592f5430",
      fullName: "bdairtonn",
      emailAddress: "aheatlyn@behance.net",
      mobileNumber: "2258066354",
      role: "organizer",
      status: "inactive",
    },
    {
      userId: "e2ca180d-6c0b-4763-8078-d2350141bd1c",
      fullName: "chalpineo",
      emailAddress: "mkitchingmano@bloglovin.com",
      mobileNumber: "4461153795",
      role: "admin",
      status: "inactive",
    },
    {
      userId: "347908e2-cf7b-4784-ad75-a5b7ff49114f",
      fullName: "amacallenp",
      emailAddress: "ayearnp@chron.com",
      mobileNumber: "5492052783",
      role: "organizer",
      status: "active",
    },
    {
      userId: "c1ec3e37-4a37-4c34-99fb-1be518959108",
      fullName: "hberminghamq",
      emailAddress: "syurasovq@un.org",
      mobileNumber: "9917647178",
      role: "admin",
      status: "inactive",
    },
    {
      userId: "7539c3b9-3084-4ded-bb5a-94be9bcc8eee",
      fullName: "dgarriochr",
      emailAddress: "asitlintonr@redcross.org",
      mobileNumber: "2949625992",
      role: "player",
      status: "inactive",
    },
    {
      userId: "04adc233-1270-4f74-b911-555a0e31b421",
      fullName: "smarjots",
      emailAddress: "msinnotts@miibeian.gov.cn",
      mobileNumber: "8255076363",
      role: "admin",
      status: "active",
    },
    {
      userId: "3e3f1898-7953-4211-b0c5-290a11c54e64",
      fullName: "tmcilvaneyt",
      emailAddress: "sbrount@ucoz.com",
      mobileNumber: "1894303204",
      role: "player",
      status: "active",
    },
    {
      userId: "bf43412b-f9b3-459a-95a0-3b81f3c8b39f",
      fullName: "bcaigeru",
      emailAddress: "rsmittouneu@vistaprint.com",
      mobileNumber: "2361214676",
      role: "admin",
      status: "inactive",
    },
    {
      userId: "c405f031-e3a4-4e38-b16d-e863c89a4319",
      fullName: "earchleyv",
      emailAddress: "ljacobowitzv@tumblr.com",
      mobileNumber: "5629551866",
      role: "organizer",
      status: "inactive",
    },
    {
      userId: "8e0666c3-9e0e-406f-85c2-9d31c3c498a2",
      fullName: "wneliganw",
      emailAddress: "bjanissonw@sciencedirect.com",
      mobileNumber: "8537698139",
      role: "admin",
      status: "active",
    },
    {
      userId: "ccd25372-c7e5-4ca0-8a28-6df98ac59c24",
      fullName: "ohumbeyx",
      emailAddress: "csambeckx@google.ca",
      mobileNumber: "1267262658",
      role: "admin",
      status: "inactive",
    },
    {
      userId: "8ad0f225-b14f-4a70-90c2-c03c54822002",
      fullName: "cmclaggany",
      emailAddress: "ggribbinsy@webmd.com",
      mobileNumber: "4532355803",
      role: "player",
      status: "active",
    },
    {
      userId: "3807b7df-6b43-48bc-b2cc-302be4b4d957",
      fullName: "rgoodacrez",
      emailAddress: "rsayrez@wikipedia.org",
      mobileNumber: "8761689271",
      role: "admin",
      status: "active",
    },
    {
      userId: "83d581d0-e682-425a-89a1-ae945fbf575c",
      fullName: "cwyard10",
      emailAddress: "ubothwell10@fastcompany.com",
      mobileNumber: "4527347398",
      role: "admin",
      status: "active",
    },
    {
      userId: "4ccc6c9d-9832-4fc5-bd83-efff1f00af60",
      fullName: "bpetrenko11",
      emailAddress: "mmalyan11@youtube.com",
      mobileNumber: "9267786171",
      role: "organizer",
      status: "inactive",
    },
    {
      userId: "3e717d74-d8be-4f79-a23f-998db593ca5d",
      fullName: "efrentz12",
      emailAddress: "jfalkingham12@ycombinator.com",
      mobileNumber: "5486890845",
      role: "organizer",
      status: "active",
    },
    {
      userId: "9543bf36-39ff-498c-8b82-3b77169e7b0e",
      fullName: "afrancesch13",
      emailAddress: "heede13@house.gov",
      mobileNumber: "5057641214",
      role: "player",
      status: "inactive",
    },
    {
      userId: "260aeedc-7838-4ca5-a28a-4daf4338236f",
      fullName: "rcancellario14",
      emailAddress: "bpotten14@arizona.edu",
      mobileNumber: "9256910824",
      role: "organizer",
      status: "active",
    },
    {
      userId: "9eb4daed-a975-4732-bc71-86f0a03dd9cf",
      fullName: "cnoore15",
      emailAddress: "ctwigge15@ca.gov",
      mobileNumber: "6995369518",
      role: "organizer",
      status: "active",
    },
    {
      userId: "34d8f7b7-1f59-4581-81e2-68b0d04c531f",
      fullName: "tmcavin16",
      emailAddress: "scastanaga16@ameblo.jp",
      mobileNumber: "2249975507",
      role: "player",
      status: "inactive",
    },
    {
      userId: "8b051511-ca5e-447e-b8d5-614088fdbeb8",
      fullName: "bklimaszewski17",
      emailAddress: "mduplantier17@toplist.cz",
      mobileNumber: "5109251806",
      role: "player",
      status: "active",
    },
    {
      userId: "5b395469-dba7-4217-8bf5-1c2eca1ebc89",
      fullName: "savann18",
      emailAddress: "boscroft18@europa.eu",
      mobileNumber: "6546807383",
      role: "player",
      status: "inactive",
    },
    {
      userId: "b7b719d5-f483-48d8-aba4-25c81bfd1d57",
      fullName: "efaircley19",
      emailAddress: "rbikker19@epa.gov",
      mobileNumber: "4073642033",
      role: "organizer",
      status: "inactive",
    },
    {
      userId: "c5a000e6-edd4-482d-a1d8-95e2b79d1477",
      fullName: "rfinn1a",
      emailAddress: "khackly1a@epa.gov",
      mobileNumber: "8556430247",
      role: "organizer",
      status: "active",
    },
    {
      userId: "d4507062-1180-49a7-9ea3-8beccb7877aa",
      fullName: "dheistermann1b",
      emailAddress: "wprettejohns1b@nsw.gov.au",
      mobileNumber: "1799627993",
      role: "player",
      status: "inactive",
    },
    {
      userId: "48cf648c-6f01-4f7a-b2b3-f8005d05ce5d",
      fullName: "scoils1c",
      emailAddress: "nmugridge1c@alexa.com",
      mobileNumber: "2981514752",
      role: "player",
      status: "active",
    },
    {
      userId: "086ccfb1-a30d-4c3c-bae9-e96333fbb7a9",
      fullName: "hmcarley1d",
      emailAddress: "cscaice1d@sun.com",
      mobileNumber: "6231081840",
      role: "player",
      status: "inactive",
    },
    {
      userId: "f80cb501-b621-453c-be0f-b8c1818284cd",
      fullName: "bwandtke1e",
      emailAddress: "banlay1e@cafepress.com",
      mobileNumber: "7168982849",
      role: "admin",
      status: "active",
    },
    {
      userId: "db17e28d-93c3-402b-b746-39e348041cdf",
      fullName: "slinney1f",
      emailAddress: "cuglow1f@mail.ru",
      mobileNumber: "5077416383",
      role: "player",
      status: "active",
    },
    {
      userId: "857feca6-9eca-4cc0-a7c9-c1ddd3a940d6",
      fullName: "bcoslett1g",
      emailAddress: "mdebrick1g@oaic.gov.au",
      mobileNumber: "6296808462",
      role: "organizer",
      status: "active",
    },
    {
      userId: "11d57fd0-c968-499b-96da-249e87e6efec",
      fullName: "kshapera1h",
      emailAddress: "jgammidge1h@imgur.com",
      mobileNumber: "5886395939",
      role: "player",
      status: "inactive",
    },
    {
      userId: "3308ee1b-2b05-44fb-a8ac-41b62c0fdd0c",
      fullName: "vbrennan1i",
      emailAddress: "mburr1i@pinterest.com",
      mobileNumber: "4655283086",
      role: "admin",
      status: "active",
    },
  ];
}

const AccountList = async () => {
  const data = await getData();

  return (
    <>
      <AdminNavbar title="Administration" showTabs />
      <section className="pt-8">
        <CustomContainer>
          <div>
            <div className="flex items-center gap-4 pb-8">
              <p className="text-lg font-medium">Manage Account</p>
              <Link
                href={"/admin/account/create"}
                className={` rounded-3xl bg-[#e50b0d] text-sm px-4 py-1.5 text-nowrap hover:bg-[#ff5657] hover:shadow-[0_3px_5px_3px_rgba(234,125,94,0.1)] `}
              >
                + Create Account
              </Link>
            </div>

            <DataTable columns={columns} data={data} />
          </div>
        </CustomContainer>
      </section>
    </>
  );
};

export default AccountList;
