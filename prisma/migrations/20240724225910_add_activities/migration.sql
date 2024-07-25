-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "activities" TEXT[] DEFAULT ARRAY['Work']::TEXT[];
