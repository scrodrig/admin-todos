-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "isadmin" BOOLEAN DEFAULT false,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6),
    "roles" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);
