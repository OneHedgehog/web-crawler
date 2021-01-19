<?php

namespace App\Repository;

use App\Entity\SiteMetadata;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method SiteMetadata|null find($id, $lockMode = null, $lockVersion = null)
 * @method SiteMetadata|null findOneBy(array $criteria, array $orderBy = null)
 * @method SiteMetadata[]    findAll()
 * @method SiteMetadata[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SiteMetadataRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SiteMetadata::class);
    }

    // /**
    //  * @return SiteMetadata[] Returns an array of SiteMetadata objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SiteMetadata
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
